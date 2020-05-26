const Boom = require('boom');
const User = require('../database/User');
const Product = require('../database/Product');

exports.home = async (req, reply) => {
	reply.send({
		message : 'Welcome to simple-shop-api => https://github.com/Forsythe-jones/simple-shop-api'
	});
};
exports.register = async (req, reply) => {
	const user = req.body;

	try {
		if (!user.username || !user.password) {
			throw Boom.notAcceptable('Enter username and pwd.');
		}
		let foundUser = await User.findOne({ username: user.username });
		if (foundUser) {
			throw Boom.conflict('User already exists.');
		}
		const newUser = await User.create({ username: user.username, password: user.password });
		if (newUser && newUser._id) {
			return reply.status(200).send({
				statusCode : reply.statusCode,
				message    : 'Saved Successfully',
				_id        : newUser._id,
				username   : newUser.un,
				token      : req.newToken
			});
		}
		throw Boom.badRequest('Unable to create User.');
	} catch (error) {
		return reply.send(error);
	}
};

exports.login = async (req, reply) => {
	const user = req.body;

	try {
		if (!user.username || !user.password) {
			throw Boom.notAcceptable('Enter username and pwd.');
		}
		let foundUser = await User.findOne({ username: user.username });
		if (!foundUser) {
			throw Boom.conflict('User not found.');
		}
		if (!bcrypt.compareSync(user.pwd, foundUser.pwd)) {
			throw Boom.notAcceptable('Bad password.');
		}
		return reply.status(200).send({
			statusCode : reply.statusCode,
			message    : 'User Login done successfully ',
			_id        : foundUser._id,
			username   : foundUser.un,
			token      : req.newToken
		});
	} catch (error) {
		return reply.send(error);
	}
};
exports.getProducts = async (req, reply) => {
	const user = req.body;
	try {
		await Product.find({}, (error, products) => {
			if (error) throw Boom.badRequest('Failed to load', error);
			reply.status(200).send({
				statusCode : reply.statusCode,
				products
			});
		});
	} catch (error) {
		return reply.send(error);
	}
};
exports.getProduct = async (req, reply) => {
	const user = req.body;
	const params = req.params;
	try {
		await Product.findOne({ _id: params.id }, (error, product) => {
			reply.status(200).send({
				statusCode : reply.statusCode,
				product
			});
		});
	} catch (error) {
		return reply.send(error);
	}
};
