import express from 'express';
import multer from 'multer';
import validator from '../middleware/validator';
import seriesService from '../services/series.service';
import fileService from '../services/file.service';

const router = express.Router();
const upload = multer();

router.post(
	'/',
	upload.single('image'),
	validator('required', { field: 'title' }),
	validator('required', { field: 'description' }),
	validator('fileSize', { file: 'file', maxSize: 1e+7 }), // 10MB
	validator('fileType', { file: 'file', types: /^image\/.*$/ }),
	async (req, res) => {
		const location = await fileService.uploadFile(req.validated.file);
		await seriesService.createSeries(
			{
				title: req.validated.title,
				description: req.validated.description,
				image: location,
			},
		);
		res.json({ success: true });
	},
);


export default router;
