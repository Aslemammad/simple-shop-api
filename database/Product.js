const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema(
	{
		nm          : {
			//name
			type      : String,
			required  : true,
			unique    : true,
			trim      : true,
			lowercase : true
		},
		price       : {
			type     : Number,
			required : true,
			trim     : true
		},
		description : {
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
