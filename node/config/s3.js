export default {
	accessKeyId: process.env.S3_ACCESS_KEY_ID || 3001,
	secretAccessKey: process.env.S3_SECRET_KEY || 'secret',
	publicBucket: process.env.S3_PUBLIC_BUCKET || 'eventzoom',
	bucketUrl: process.env.S3_BUCKET_URL || '',
	cfBucketUrl: process.env.CF_BUCKET_URL || '',
};
