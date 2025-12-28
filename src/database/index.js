import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import Student from '../models/StudentModel';
import User from '../models/UserModel';
import Photo from '../models/PhotoModel';

const connection = new Sequelize(databaseConfig);
const models = [Student, User, Photo];

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
