require('dotenv').config();

const fastify = require('fastify')({ logger: true });
fastify.get('/', (req, reply) => {
	reply.send('hello');
});

const cors = require('fastify-cors');
const db = require('./database/db');
const routes = require('./routes/routes');

const app = fastify;
const env = process.env; // environment variables
const port = env.PORT || 3000;

// plugins
app.register(cors); // cors activating
app.register(db); // mongoose connecting

// routes
routes.map((route) => app.route(route));

const start = async () => {
	try {
		await app.listen(port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
