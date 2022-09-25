import Print from "../../helpers/Print";
import { ErrorResponse, SuccessResponse, SuccessResponseData, UnauthorizedResponse, ValidationError } from "../../helpers/Response";
import { NextFunction, Request, Response } from 'express';


const asyncWrapper = (fn: any) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next);


class BaseController {
    SuccessResponse
    SuccessResponseData
    asyncWrapper
    service
    ErrorResponse
    ValidationError
    UnauthorizedResponse
  Print

  constructor(service: any) {
      this.service = service
      this.asyncWrapper = asyncWrapper;
      this.SuccessResponse = SuccessResponse;
      this.SuccessResponseData = SuccessResponseData;
      this.ErrorResponse =  ErrorResponse;
      this.ValidationError = ValidationError;
      this.UnauthorizedResponse =   UnauthorizedResponse;
      this.Print = Print
    }
  }

  export default BaseController