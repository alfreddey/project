const jwt = require("jsonwebtoken");

function generateToken(data) {
  const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY, {
    expiresIn: 24 * 60 * 60,
  });
  return token;
}
