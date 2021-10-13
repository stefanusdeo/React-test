const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({ msg: 'no token, authorization denind' });
  }

  try {
    const decode = jwt.verify(token, config.get('jwtrahasia'));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
