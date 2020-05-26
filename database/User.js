const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema(
	{
		un  : {
			//username
			type      : String,
			required  : true,
			unique    : true,
			trim      : true,
			lowercase : true
		},

		pwd : {
			//password
			type     : String,
			required : true,
			trim     : true
		}
	},
	{
		timestamps : true
	}
);
schema.plugin(uniqueValidator);
schema.pre('save', async function(next) {
	this.isModified('pwd') && (this.pwd = await bcrypt.hash(this.pwd, 8));
	next();
});

module.exports = mongoose.model('User', schema);
