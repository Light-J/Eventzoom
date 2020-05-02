export default {
	uri: process.env.MONGO_URL || 'mongodb://user1:user1@cluster0-shard-00-00-dofrg.mongodb.net:27017,cluster0-shard-00-01-dofrg.mongodb.net:27017,cluster0-shard-00-02-dofrg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
};
