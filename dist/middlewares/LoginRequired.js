"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken');
var _users = require('../models/users'); var _users2 = _interopRequireDefault(_users);

exports. default = async (req,res, next) => {

  const AuthToken = req.headers.authorization;

  if(!AuthToken) {

    return res.status(401).json({
      errors: ['Login required'],
    });

  }

  const [, token] = AuthToken.split(' ');

  try {

    const { data } = _jsonwebtoken.verify.call(void 0, token, "sjdkljqdunufunoi2j389r494h82");

    const id = data;
    const email = data;

    const user = await _users2.default.findOne({
      where: id, email
    });

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });

    }

    req.userId = id;
    req.userEmail = email;

    return next();

  } catch(e) {

    return res.status(401).json({
      errors: ['Invalid Token'],
    });

  }

};
