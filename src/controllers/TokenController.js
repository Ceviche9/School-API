import User from '../models/users';
import {sign} from 'jsonwebtoken';

class TokenController {

  async store(req, res) {

    const {email = '', password = ''} = req.body;

    if(!email || !password) {
      return res.status(401).json({
        errors:['Credenciais inválidas']
      });
    }

    //Checando se o email enviado bate com algum na base de dados
    const user = await User.findOne({where: {email}})

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
    const token = sign({id, email}, "sjdkljqdunufunoi2j389r494h82" ,{
      expiresIn: "1d",
    });


    return res.json({token});

  }

}

export default new TokenController();
