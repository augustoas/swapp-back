import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { IApiResponse } from 'src/types/Api.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private exceptionResponse: IApiResponse<any> = {
    statusCode: 500,
    statusText: 'Internal Server Error',
    data: {
      message: 'Error',
      payload: {},
    },
  };
  private details: any = {};

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      this.exceptionResponse.statusCode = exception.getStatus();
      this.exceptionResponse.statusText = exception.message;
      this.details = exception.getResponse();
    } else if (exception instanceof QueryFailedError) {
      this.exceptionResponse.statusCode = 409;
      this.exceptionResponse.statusText = 'Database Query Failed';
      this.details = exception.driverError.constraint;
    }

    this.exceptionResponse.data.payload = {
      details: this.details,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.log(exception);
    response
      .status(this.exceptionResponse.statusCode)
      .json(this.exceptionResponse);
  }
}
