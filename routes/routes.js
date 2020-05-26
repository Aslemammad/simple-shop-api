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
	}
];

module.exports = routes;
