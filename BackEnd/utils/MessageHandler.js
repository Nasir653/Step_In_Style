const messageHandler = async (res, status, message, payload) => {
  return res.status(status).json({ message: message, payload: payload });
};

module.exports = { messageHandler };
