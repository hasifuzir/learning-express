//function to generate success code
let success = (response) => {
    return {
        responseCode: "200",
        responseMessage: "API Request Successful",
        responseContent: response
    }
};

//function to generate error code
let fail= (code, message, errorCode, errorMessage) => {
    return {
        responseCode: code,
        responseMessage: message,
        responseContent: {
            errors: [{
                errorCode: errorCode,
                errorMessage: errorMessage
            }]
        }
    }
};

const response = (responseCode, responseMessage, response) => ({responseCode, responseMessage, response})

module.exports = {
    success,
    fail,
    response
};