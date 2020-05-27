require('dotenv').config();
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const env = process.env; // environment variables

exports.registerToken = async (req, reply, next) => {
	const user = req.body;
	req.newToken = jwt.sign({ username: user.username }, 'SIMPLE_SHOP_API_SECRET', {
		expiresIn : 86400 * 30 // 30 days
	});
	next();
};
exports.verifyToken = async (req, reply, next) => {
	let token = req.headers['x-access-token'];
	req.verifiedToken = {};
	try {
		if (!token) throw Boom.unauthorized('No token.');
		jwt.verify(token, 'SIMPLE_SHOP_API_SECRET', (err, decoded) => {
			if (err) throw Boom.badImplementation('Failed token.');

			req.verifiedToken.username = decoded.username;
		});
		next();
	} catch (error) {
		reply.send(error);
	}
};
