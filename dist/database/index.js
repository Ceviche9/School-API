"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _aluno = require('../models/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _users = require('../models/users'); var _users2 = _interopRequireDefault(_users);
var _photo = require('../models/photo'); var _photo2 = _interopRequireDefault(_photo);

const models = [_aluno2.default, _users2.default, _photo2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
