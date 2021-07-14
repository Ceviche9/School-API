import {verify} from 'jsonwebtoken';
import User from '../models/users';

export default async (req,res, next) => {

  const AuthToken = req.headers.authorization;

  if(!AuthToken) {

    return res.status(401).json({
      errors: ['Login required'],
    });

  }

  const [, token] = AuthToken.split(' ');

  try {

    const { data } = verify(token, "sjdkljqdunufunoi2j389r494h82");

    const id = data;
    const email = data;

    const user = await User.findOne({
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
