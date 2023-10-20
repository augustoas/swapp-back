import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const OptionalJwt = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (token) {
      try {
        const decodedToken = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); // Remove 'Bearer ' from token
        request.user = decodedToken;
      } catch (error) {
        request.user = null;
      }
    }

    return request.user;
  },
);