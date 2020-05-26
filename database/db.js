const fastifyPlugin = require('fastify-plugin');
const mongoose = require('mongoose');
async function dbConnector(fastify, options) {
	try {
		const url = 'mongodb://localhost:27017/simple-shop-api';
		const db = await mongoose.connect(url, {
			useUnifiedTopology : true,
			useCreateIndex     : true,
			useNewUrlParser    : true
		});
		fastify.decorate('db', db);
	} catch (err) {
		console.log(err);
	}
}
module.exports = fastifyPlugin(dbConnector);
