"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _users = require('../models/users'); var _users2 = _interopRequireDefault(_users);
var _jsonwebtoken = require('jsonwebtoken');

class TokenController {

  async store(req, res) {

    const {email = '', password = ''} = req.body;

    if(!email || !password) {
      return res.status(401).json({
        errors:['Credenciais inválidas']
      });
    }

    //Checando se o email enviado bate com algum na base de dados
    const user = await _users2.default.findOne({where: {email}})

    if(!user) {
      return res.status(401).json({
        errors:['Usuário não cadastrado']
      });
    }

    if(!(await user.passwordCheck(password))){
      return res.status(401).json({
        errors:['Senha inválida'],
      });
    }

    const {id} = user;
    const token = _jsonwebtoken.sign.call(void 0, {id, email}, "sjdkljqdunufunoi2j389r494h82" ,{
      expiresIn: "1d",
    });


    return res.json({token});

  }

}

exports. default = new TokenController();
