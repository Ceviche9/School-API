import Sequelize, {Model} from 'sequelize';
import appconfig from '../config/appconfig';

export default class Photo extends Model {

  static init(sequelize) {

    super.init({

      originalname: {

        type: Sequelize.STRING,
        default: '',
        validate: {
          notEmpty: {
            arg: [3, 255],
            msg: 'O campo não pode ficar vazio',
          },
        },
      },

     filename: {
        type: Sequelize.STRING,
        default: '',
        validate: {
          notEmpty: {
            arg: [3, 255],
            msg: 'O campo não pode ficar vazio',
          },
        },
      },

      url: {

        type: Sequelize.VIRTUAL,
        get() {

          return `${appconfig.url}/images/${this.getDataValue('filename')}`;
        },
      }
    }, {sequelize})
    return this;

  }

  static associate(models) {
    this.belongsTo(models.Aluno, {foreignKey: 'student_id'});
  }

}
