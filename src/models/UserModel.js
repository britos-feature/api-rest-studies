import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class UserModel extends Model {
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
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
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
      user.password_hash = await bcrypt.hash(user.password, 8);
    });

    return this;
  }

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default UserModel;
