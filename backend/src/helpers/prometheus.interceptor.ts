import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as promClient from 'prom-client';

const httpRequestInfo = new promClient.Histogram({
  name: 'http_request_info',
  help: 'Information of HTTP requests',
  labelNames: ['module', 'controller', 'method', 'route', 'statusCode'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 2.5, 3, 5, 10],
});

@Injectable()
/**
 * Interceptor that measures the execution time of HTTP requests and sends metrics to Prometheus.
 */
export class PrometheusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const excludedRoute = '/backend/metrics'; // Change this to the route you want to exclude
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const route = request.route.path;
    const method = context.getHandler().name; // Method
    const controller = context.getClass().name; // Controller
    const module = extractModuleFromRoute(route); // Module
    const statusCode = context.switchToHttp().getResponse().statusCode

    if (route === excludedRoute) return next.handle();
    return next.handle().pipe(
      tap(() => {
        httpRequestInfo.labels(module, controller, method, route, statusCode).observe(Date.now() - now)
      }),
    );
  }
}

function extractModuleFromRoute(route: any) {
  const moduleRegex = /^\/backend\/([a-zA-Z0-9_-]+)/;
  const match = route.match(moduleRegex);
  return match[1];
}