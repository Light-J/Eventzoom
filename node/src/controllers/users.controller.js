import express from 'express';
import validator from '../middleware/validator';
import UserService from '../services/user.service';
import User from '../models/user.model';

const router = express.Router();

router.post(
	'/',
	validator('required', { field: 'email' }),
	validator('required', { field: 'password' }),
	validator('sameAs', { field: 'password', otherField: 'passwordConfirmation' }),
	validator('validModel', { model: User }),
	async (req, res) => {
		await UserService.createUser(req.validated);
		res.json({ success: true });
	},
);


export default router;
