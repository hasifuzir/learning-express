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
        responseContent: [{
            errorCode: errorCode,
            errorMessage: errorMessage
        }]
    }
};

let customResponse = (responseCode, responseMessage, responseContent) => ({
    responseCode,
    responseMessage,
    responseContent
});


module.exports = {
    success,
    fail,
    customResponse
};