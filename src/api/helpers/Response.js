exports.SuccessResponse = function ({res,statuscode="TXN", message, code = 200}) {
  var response = {
    status: 'success',
    statuscode: statuscode,
    message: message,
  };
  return res.status(code).json(response);
};


exports.SuccessResponseData = function({res,statusCode="TXN",message,data,code = 200}){
    var response = {
        status : 'success',
        statuscode:statusCode,
        message:message,
        data:data
    }
    return res.status(code).json(response)
}

exports.ErrorResponse = function({res,statusCode="TXF",message,code=200}){
        var response = {
            status:'error',
            statuscode : statusCode,
            message: message
        }

        return res.status(code).json(response)
}

exports.ValidationError = function({res,statusCode= "TXF",message,data,code=200}){
        var response = {
            status:'validation_error',
            statuscode:statusCode,
            message:message,
            data:data
        }

        return res.status(code).json(response)
}

exports.UnauthorizedResponse = function({res,statusCode= "UA",message}){
    var data = {
        status:'error',
        statuscode:statusCode,
        message:message
    }
}