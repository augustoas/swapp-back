import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../types/Api.interface'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    // Modify the response data before it's sent to the client
    return next.handle().pipe(map(data => ({
      statusCode: context.switchToHttp().getResponse().statusCode,
      statusText: 'success',
      data: {
        message: data.message,
        payload: data.payload
      }
    })));
  }
}