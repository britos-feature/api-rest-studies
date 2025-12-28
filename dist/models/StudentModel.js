"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class StudentModel extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'The name field must contain between 3 and 50 characters.',
            },
          },
        },
        lastname: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'The lastname field must contain between 3 and 50 characters.',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
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
          type: _sequelize2.default.STRING,
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

exports. default = StudentModel;
