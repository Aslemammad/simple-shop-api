const authorization = require('../middleware/authorization');
const handlers = require('./handlers');

const routes = [
	{
		method  : 'GET',
		url     : '/api',
		handler : handlers.home
	},
	{
		method     : 'POST',
		url        : '/api/register',
		preHandler : [
			authorization.registerToken
		],
		handler    : handlers.register
	},
	{
		method     : 'POST',
		url        : '/api/login',
		preHandler : [
			authorization.registerToken
		],
		handler    : handlers.login
	},
	{
		method     : 'POST',
		url        : '/api/add-product',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.addProduct
	},
	{
		method     : 'GET',
		url        : '/api/products',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.getProducts
	},
	{
		method     : 'GET',
		url        : '/api/product/:id',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.getProduct
	},
	{
		method     : 'GET',
		url        : '/api/cart',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.getCart
	},
	{
		method     : 'POST',
		url        : '/api/cart/:id',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.addToCart
	},
	{
		method     : 'POST',
		url        : '/api/remove-cart/:id',
		preHandler : [
			authorization.verifyToken
		],

		handler    : handlers.deleteFromCart
	}
];

module.exports = routes;
