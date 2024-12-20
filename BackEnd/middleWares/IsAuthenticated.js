const jwt = require("jsonwebtoken");
const { messageHandler } = require("../utils/MessageHandler");

const IsAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    //const {token} = req.query;

    const secretKey = "secretKeyForLogin";

    jwt.verify(token, secretKey, (error, resolve) => {
      if (error) {
        return messageHandler(res, 404, "Please Login Again");
      } else {
        req.userId = resolve.userId;
        return next();
      }
    });
  } catch (error) {
    messageHandler(res, 500, "Server Error");
  }
};

module.exports = { IsAuthenticated };
