module.exports.sendResponseIfExists = (result, response, errMsg, errStatus) => {
  if (result) response.send(result);
  else response.status(errStatus).send({ message: errMsg });
};
