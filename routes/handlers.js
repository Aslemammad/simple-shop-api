const Boom = require('boom');
const User = require('../database/User');
const Product = require('../database/Product');
const Cart = require('../database/Cart');

exports.home = async (req, reply) => {
	reply.send({
		message : 'Welcome to simple-shop-api => https://github.com/Forsythe-jones/simple-shop-api'
	});
};
exports.register = async (req, reply) => {
	const user = req.body;

	try {
		if (!user.username || !user.password) {
			throw Boom.notAcceptable('Enter username and password.');
		}
		let foundUser = await User.findOne({ username: user.username });
		if (foundUser) {
			throw Boom.conflict('User already exists.');
		}
		const newUser = await User.create({ username: user.username, password: user.password });
		const newCart = await Cart.create({ username: user.username });
		if (newUser._id && newCart._id) {
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
		if (!bcrypt.compareSync(user.password, foundUser.password)) {
			throw Boom.notAcceptable('Bad password.');
		}
		return reply.status(200).send({
			statusCode : reply.statusCode,
			message    : 'User Login done successfully ',
			_id        : foundUser._id,
			username   : foundUser.username,
			token      : req.newToken
		});
	} catch (error) {
		return reply.send(error);
	}
};
exports.addProduct = async (req, reply) => {
	const user = req.body;
	console.log(req.verifiedToken.username);
	try {
		let newProduct = await Product.create({
			name        : user.name,
			price       : user.price,
			description : user.description,
			username    : req.verifiedToken.username
		});
		if (newProduct._id) {
			return reply.status(200).send({
				statusCode  : reply.statusCode,
				message     : 'Product created. ',
				_id         : newProduct._id,
				name        : newProduct.name,
				description : newProduct.description
			});
		}
		throw Boom.badRequest('Product creating failed.');
	} catch (error) {
		return reply.send(error);
	}
};
exports.getProducts = async (req, reply) => {
	const user = req.body;
	const params = req.params;

	try {
		if (params.text) {
			return await Product.findOne({ $text: { $search: params.text } }, (err, products) => {
				reply.status(200).send({
					statusCode : reply.statusCode,
					products
				});
			});
		}
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

exports.addToCart = async (req, reply) => {
	const username = req.verifiedToken.username;
	const params = req.params;

	try {
		let foundCart = await Cart.findOne({ username });
		let removeDupArray = Array.from(
			new Set([
				...foundCart.products,
				params.id
			])
		);
		await Cart.findOneAndUpdate({ username: username }, { products: removeDupArray }, (error, cart) => {
			if (!cart) throw Boom.badRequest('Failed to add.');
			reply.status(200).send({
				statusCode : reply.statusCode,
				message    : 'Added to cart'
			});
		});
	} catch (error) {
		return reply.send(error);
	}
};
exports.deleteFromCart = async (req, reply) => {
	const username = req.verifiedToken.username;
	const params = req.params;

	try {
		await Cart.findOneAndUpdate({ username }, { $pull: { products: params.id } }, (error, cart) => {
			if (!cart) throw Boom.badRequest('Failed to delete.');
			reply.status(200).send({
				statusCode : reply.statusCode,
				message    : 'Deleted successfully.'
			});
		});
	} catch (error) {
		return reply.send(error);
	}
};

exports.getCart = async (req, reply) => {
	const username = req.verifiedToken.username;
	try {
		await Cart.findOne({ username }, (error, cart) => {
			if (!cart) throw Boom.badRequest('failed to load.');
			reply.status(200).send({
				statusCode : reply.statusCode,
				items      : cart.products
			});
		});
	} catch (error) {
		return reply.send(error);
	}
};
