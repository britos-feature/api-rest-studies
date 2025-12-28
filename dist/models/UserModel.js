"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class UserModel extends _sequelize.Model {
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
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [4, 255],
              msg: 'The password field must contain at least 4 characters.',
            },
          },
        },
      },
      { sequelize, tableName: 'users' }
    );

    this.addHook('beforeSave', async (user) => {
      if (!user.password) return;
      user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
}

exports. default = UserModel;
