import express from 'express';
import { controller } from '../controllers/userController.js';

const router = express.Router()

router.get('/',controller.home)

router.post('/usuarios',controller.register)

router.get('*',controller.notFound)

export default router;