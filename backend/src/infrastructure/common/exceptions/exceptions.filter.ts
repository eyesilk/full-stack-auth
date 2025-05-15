import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpException, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { NotFoundError } from "rxjs";
import { ConflictError } from "src/application/errors";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    if (exception instanceof ConflictError) {
      throw new ConflictException(exception.message);
    }
    else if (exception instanceof NotFoundError) {
      throw new NotFoundException(exception.message);
    }
    else if (exception instanceof HttpException) {
      resp.status(exception.getStatus()).json(exception.getResponse());
    }
    else {
      throw new HttpException('Internal server error', 500);
    }
  }
}
