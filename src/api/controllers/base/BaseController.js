var response = require('../../helpers/Response')

const asyncWrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);

class BaseController {
  constructor(service) {
    this.service = service
    this.asyncWrapper = asyncWrapper;
    this.SuccessResponse = response.SuccessResponse;
    this.SuccessResponseData = response.SuccessResponseData;
    this.ErrorResponse = response.ErrorResponse;
    this.ValidationError = response.ValidationError;
    this.UnauthorizedResponse = response.UnauthorizedResponse;
  }
}

module.exports = BaseController;
