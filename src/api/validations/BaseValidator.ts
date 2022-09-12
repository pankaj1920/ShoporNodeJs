import { validationResult } from "express-validator";
import { ValidationError } from "../helpers/Response";

class BaseValidator {

    static sendError(error) {
        return [error, BaseValidator.validationResult]
    }

    static validationResult(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // return response.ValidationError(res,"TXF",errors.array())
            return ValidationError({ res: res, data: errors.array({ onlyFirstError: true })[0].msg })
        }

        return next();
    }
}

export default BaseValidator