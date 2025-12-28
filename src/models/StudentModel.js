import Sequelize, { Model } from 'sequelize';

class StudentModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'The name field must contain between 3 and 50 characters.',
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'The lastname field must contain between 3 and 50 characters.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Error, email in use!',
          },
          validate: {
            isEmail: {
              msg: 'Email invalid!',
            },
          },
        },
        classname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 10],
              msg: 'The classname field must contain between 3 and 10 characters.',
            },
          },
        },
      },
      { sequelize, tableName: 'students' }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.PhotoModel, {
      foreignKey: 'student_id',
    });
  }
}

export default StudentModel;
