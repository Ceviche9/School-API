"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _photo = require('../models/photo'); var _photo2 = _interopRequireDefault(_photo);

 class Aluno extends _sequelize.Model {

  static init(sequelize) {

    super.init({

      nome: {
        type: _sequelize2.default.STRING,
        default: '',
        validate: {
          len: {

            arg: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 Caracteres',
          },
        },
      },
      sobrenome: {
        type: _sequelize2.default.STRING,
        default: '',
        validate: {
          len: {

            arg: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 Caracteres',
          },
        },

      },
      email: {
        type: _sequelize2.default.STRING,
        default: '',
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      idade: {
        type: _sequelize2.default.INTEGER,
        default: '',
        validate: {
          isInt: {
            msg: 'A idade precisa ser um número inteiro ',
          },
        },
      },
      peso: {
        type: _sequelize2.default.FLOAT,
        default: '',
        validate: {
          isFloat: {
            msg: 'O peso precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },
      altura: {
        type: _sequelize2.default.FLOAT,
        default: '',
        validate: {
          isFloat: {
            msg: 'A altura precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },

    }, {sequelize})
    return this;

  }

  static associate(models){
    this.hasMany(models.Photo, {foreignKey: 'student_id'});
  }

} exports.default = Aluno;
