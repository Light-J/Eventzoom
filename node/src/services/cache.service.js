import redis from 'redis';
import redisConfig from '../../config/redis';

const client = redis.createClient(redisConfig);

const remember = (key, time, retrieve) => new Promise((resolve, reject) => {
	client.get(key, async (err, value) => {
		if (err) {
			return reject(err);
		}
		if (value !== null) {
			return resolve(JSON.parse(value));
		}
		const functionResult = await retrieve();
		return client.setex(key, time, JSON.stringify(functionResult), (err1) => {
			if (err1) {
				return reject(err1);
			}
			return resolve(functionResult);
		});
	});
});
export default { remember };
