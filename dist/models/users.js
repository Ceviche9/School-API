"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {

  static init(sequelize) {

    super.init({

      nome: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
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

        type: _sequelize2.default.STRING,
        defaultValue: '',

      },
      password: {

        type: _sequelize2.default.VIRTUAL,
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
      user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    } )

    return this;

  }

  passwordCheck(password) {

    return _bcryptjs2.default.compare(password, this.password_hash);

  }

} exports.default = User;
