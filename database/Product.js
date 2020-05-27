const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema(
	{
		name        : {
			//name
			type      : String,
			required  : true,
			trim      : true,
			lowercase : true
		},
		price       : {
			type     : Number,
			required : true
		},
		description : {
			type     : String,
			required : true
		},
		username    : {
			// username who own this product
			type     : String,
			required : true
		}
	},
	{
		timestamps : true
	}
);
schema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', schema);
