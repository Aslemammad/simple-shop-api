const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema(
	{
		username : {
			// username who own this Cart
			type     : String,
			required : true,
			unique   : true
		},
		products : {
			type : Array
		}
	},
	{
		timestamps : true,
		autoIndex  : false
	}
);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('Cart', schema);
