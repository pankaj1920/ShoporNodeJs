import { ErrorResponse, SuccessResponse, SuccessResponseData, UnauthorizedResponse, ValidationError } from "../../helpers/Response";

const asyncWrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);

class BaseController {
    SuccessResponse
    SuccessResponseData
    asyncWrapper
    service
    ErrorResponse
    ValidationError
    UnauthorizedResponse

    constructor(service) {
      this.service = service
      this.asyncWrapper = asyncWrapper;
      this.SuccessResponse = SuccessResponse;
      this.SuccessResponseData = SuccessResponseData;
      this.ErrorResponse =  ErrorResponse;
      this.ValidationError = ValidationError;
      this.UnauthorizedResponse =   UnauthorizedResponse;
    }
  }

  export default BaseController