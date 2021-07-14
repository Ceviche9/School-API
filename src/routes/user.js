import { Router } from 'express';
import userController from '../controllers/UserController';

import LoginRequired from '../middlewares/LoginRequired';

const router = new Router();

router.get('/:id', userController.show);//para mostrar um usuário cadastrado
router.get('/', LoginRequired, userController.index);//para ver os usuários cadastrados

router.post('/', LoginRequired, userController.store);//Para adicionar um usuário
router.put('/:id',LoginRequired, userController.update);//para atualizar os dados de um usuário
router.delete('/:id',LoginRequired, userController.delete);//para deletar um usuário

export default router;

/*
index -> Lista todos os usuários -> get
store/create -> cria um novo usuário -> post
delete -> deleta um usuário -> delete
show-> mostra um usuário -> get
update -> atualiza um usuário -> patch ou put
*/
