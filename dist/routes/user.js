"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _LoginRequired = require('../middlewares/LoginRequired'); var _LoginRequired2 = _interopRequireDefault(_LoginRequired);

const router = new (0, _express.Router)();

router.get('/:id', _UserController2.default.show);//para mostrar um usuário cadastrado
router.get('/', _LoginRequired2.default, _UserController2.default.index);//para ver os usuários cadastrados

router.post('/', _LoginRequired2.default, _UserController2.default.store);//Para adicionar um usuário
router.put('/:id',_LoginRequired2.default, _UserController2.default.update);//para atualizar os dados de um usuário
router.delete('/:id',_LoginRequired2.default, _UserController2.default.delete);//para deletar um usuário

exports. default = router;

/*
index -> Lista todos os usuários -> get
store/create -> cria um novo usuário -> post
delete -> deleta um usuário -> delete
show-> mostra um usuário -> get
update -> atualiza um usuário -> patch ou put
*/
