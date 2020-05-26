let jwt = require('jsonwebtoken');
const Boom = require('boom');

const env = process.env; // environment variables

require('dotenv').config();

const registerToken = async (req, reply, next) => {
	const user = req.body;
	req.newToken = jwt.sign({ username: user.username }, env.SECRET || 'SIMPLE_SHOP_API_SECRET', {
		expiresIn : 86400 * 30 // 30 days
	});
	next();
};
const verifyToken = async (req, reply, next) => {
	let token = req.headers['x-access-token'];
	req.verifiedToken = {};
	try {
		if (!token) throw Boom.unauthorized('No token.');
		jwt.verify(token, env.SECRET || 'SIMPLE_SHOP_API_SECRET', (err, decoded) => {
			if (err) throw Boom.badImplementation('Filed token.');

			req.verifiedToken.username = decoded.username;
		});
		next();
	} catch (error) {
		reply.send(error);
	}
};

exports.registerToken = registerToken;
exports.verifyToken = verifyToken;
