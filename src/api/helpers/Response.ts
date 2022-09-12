export const SuccessResponse =  ({ res, statuscode = "TXN",  message, code = 200 }) => {
    let response = {
        status: 'success',
        statuscode: statuscode,
        message: message,
    };
    return res.status(code).json(response);
};


export const SuccessResponseData =  ({ res, statusCode = "TXN", message, data, code = 200 }) => {
    let response = {
        status: 'success',
        statuscode: statusCode,
        message: message,
        data: data
    }
    return res.status(code).json(response)
}

export const ErrorResponse =  ({ res, statusCode = "TXF", message, code = 200 }) => {
    let response = {
        status: 'error',
        statuscode: statusCode,
        message: message
    }

    return res.status(code).json(response)
}

export const ValidationError =  ({ res, statusCode = "TXF", message="Validation Error", data, code = 200 }) => {
    let response = {
        status: 'validation_error',
        statuscode: statusCode,
        message: message,
        data: data
    }

    return res.status(code).json(response)
}

export const UnauthorizedResponse =  ({ res, statusCode = "UA", message }) =>{
    let data = {
        status: 'error',
        statuscode: statusCode,
        message: message
    }
    return res.status(200).json(data);
}


