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
		timestamps : true
	}
);
schema.plugin(uniqueValidator);
schema.pre('aggregate', async function(next) {
	// if (this.isModified('products')) {
	this.products = [];
	// }

	next();
});

module.exports = mongoose.model('Cart', schema);
