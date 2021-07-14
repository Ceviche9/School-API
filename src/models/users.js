import Sequelize, {Model} from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {

  static init(sequelize) {

    super.init({

      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {

            len: {
              args: [3, 20],
              msg: 'Campo nome não pode ficar vazio',
            },

          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {

          msg: 'O Email informado já existe',

        },
        validate: {
          notEmpty: {

            isEmail: {
              msg: 'Email inválido',
            },

          },

        },
      },
      password_hash:{

        type: Sequelize.STRING,
        defaultValue: '',

      },
      password: {

        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          notEmpty: {

            len: {
              args: [6, 18],
              msg: 'A senha precisa ter entre 6 e 18 caracteres',
            },

          },

        },
      },

    }, {sequelize})

    //Fazendo o hash da senha que o usuário mandou e mandando para o password_hash->
    this.addHook('beforeSave', async user => {
      if(user.password){
      user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    } )

    return this;

  }

  passwordCheck(password) {

    return bcryptjs.compare(password, this.password_hash);

  }

}
