exports.responseCodes = {
  SUCCESS: 200,
  INVALID: 400,
  SERVER_ERROR: 500,
};

exports.createResponse = (
  res,
  statusCode,
  successResponse,
  responseMessage,
  payloadData = null
) => {
  return res.status(statusCode).json({
    success: successResponse,
    message: responseMessage,
    payload: payloadData,
  });
};
