import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

class PhotoModel extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'The Originalname field cannot be empty.',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'The Filename field cannot be empty.',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue('filename')}`;
          },
        },
      },
      { sequelize, tableName: 'photos' }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.StudentModel, {
      foreignKey: 'student_id',
    });
  }
}

export default PhotoModel;
