import Sequelize, {Model} from 'sequelize';
import Photo from '../models/photo';

export default class Aluno extends Model {

  static init(sequelize) {

    super.init({

      nome: {
        type: Sequelize.STRING,
        default: '',
        validate: {
          len: {

            arg: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 Caracteres',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        default: '',
        validate: {
          len: {

            arg: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 Caracteres',
          },
        },

      },
      email: {
        type: Sequelize.STRING,
        default: '',
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        default: '',
        validate: {
          isInt: {
            msg: 'A idade precisa ser um número inteiro ',
          },
        },
      },
      peso: {
        type: Sequelize.FLOAT,
        default: '',
        validate: {
          isFloat: {
            msg: 'O peso precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },
      altura: {
        type: Sequelize.FLOAT,
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

}
