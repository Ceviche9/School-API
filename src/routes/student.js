import { Router } from 'express';
import StudentController from '../controllers/StudentController';

import LoginRequired from '../middlewares/LoginRequired';

const router = new Router();

router.get('/', StudentController.index);
router.post('/register', LoginRequired, StudentController.store);
router.put('/update/:id', LoginRequired, StudentController.update);
router.post('/info/:id', StudentController.show);
router.delete('/delete/:id', LoginRequired, StudentController.delete);





export default router;
