exports.apiResponse = (error, response, code, message, data, rest = {}) => {
  response.send(code).json({
    error,
    code,
    message,
    data,
    ...rest,
  });
};
