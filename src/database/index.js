import Sequelize from 'sequelize';
import databaseconfig from '../config/database';
import Aluno from '../models/aluno';
import User from '../models/users';
import Photo from '../models/photo';

const models = [Aluno, User, Photo];

const connection = new Sequelize(databaseconfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
