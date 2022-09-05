const response = require("../helpers/Response")
var { param, body, validationResult } = require('express-validator');

class BaseValidation{

    static sendError(error){
        return  [error,BaseValidation.validationResult]
    }


    static validationResult(req, res, next) {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            // return response.ValidationError(res,"TXF",errors.array())
            return response.ValidationError({res :res, message : errors.array()})
        }
    
        return next();
      }
}

module.exports = BaseValidation