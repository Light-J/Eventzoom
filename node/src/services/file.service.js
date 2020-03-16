
import AWS from 'aws-sdk';
import uuid from 'uuid/v4';
import s3config from '../../config/s3';

const uploadFile = (file) => new Promise((resolve, reject) => {
	const fileExtension = file.originalname.split('.').pop();
	const s3 = new AWS.S3({
		accessKeyId: s3config.accessKeyId,
		secretAccessKey: s3config.secretAccessKey,
	});
	s3.upload({
		Bucket: s3config.publicBucket,
		Key: `${uuid()}.${fileExtension}`,
		Body: file.buffer,
		ContentType: file.mimetype,
	}, (error, result) => {
		if (error) {
			return reject(error);
		}
		return resolve(result.Location.replace(s3config.bucketUrl, s3config.cfBucketUrl));
	});
});

const removeFile = (file) => new Promise((resolve, reject) => {
	const s3 = new AWS.S3({
		accessKeyId: s3config.accessKeyId,
		secretAccessKey: s3config.secretAccessKey,
	});
	// I understand that this is not good and will break if we introduce folders
	const parts = file.split('/');

	const params = { Bucket: s3config.publicBucket, Key: parts[parts.length - 1] };

	s3.deleteObject(params, (err, data) => {
		if (err) { console.log(err, err.stack); return reject(err); } // error
		console.log(data);
		return resolve(true);
	});
});


export default { uploadFile, removeFile };
