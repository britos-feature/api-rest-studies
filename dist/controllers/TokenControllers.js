"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModel = require('../models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class TokenControllers {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password)
      return res.status(401).json({
        errors: ['Invalid credential!'],
      });

    try {
      const user = await _UserModel2.default.findOne({ where: { email } });

      if (!user)
        return res.status(401).json({
          errors: ['User not found!'],
        });

      if (!(await user.passwordIsValid(password)))
        return res.status(401).json({
          errors: ['Invalid password!'],
        });

      const { id } = user;
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({
        token,
      });
    } catch (e) {
      return res.status(500).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }
}

exports. default = new TokenControllers();
