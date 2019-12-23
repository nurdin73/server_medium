const jwt = require("jsonwebtoken");

exports.authorized = (req, res, next) => {
  let tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(403).json({
      msg: "Token is not defined"
    });
  }

  let token = tokenHeader.slice(7, tokenHeader.length);

  if (token) {
    jwt.verify(token, "thisismysecretkey", (err, decoded) => {
      if (err) {
        return res.status(403).json({
          msg: "Token is not valid"
        });
      }

      if (req.params.author_id != decoded.id) {
        return res.status(401).json({
          msg: "You are not authorized"
        });
      }

      next();
    });
  }
};

exports.authenticated = (req, res, next) => {
  let token = req.headers["authorization"];
  try {
    let tokenHeader = req.headers["authorization"];
    let token = tokenHeader.slice(7, tokenHeader.length);

    if (token) {
      jwt.verify(token, "thisismysecretkey", (err, decode) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "token is not valid"
          });
        } else {
          req.decode = decode;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not login"
      });
    }
  } catch (error) {
    res.send({
      message: "token is not defined"
    });
  }
};

exports.validate = (req, res, next) => {
  const { username, password } = req.body;
  if (username != null) {
    if (password != null) {
      return res.status(200).json({
        message: "validate"
      });
      next();
    } else {
      return res.status(204).json({
        message: "password is required"
      });
    }
  } else {
    return res.status(204).json({
      message: "username is required"
    });
  }
};
