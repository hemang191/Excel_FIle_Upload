const mongoose = require('mongoose');
const Location = require('./locationMongoModel');
const productValidationSchema = require('../utils/header_validation');

const productSchema = new mongoose.Schema({
	ShipmentType: {
		type: String,
	},
	OrderNumber: {
		type: String,
	},
	OrderType: {
		type: String,
	},
	PrimaryMode: {
		type: String,
	},
	ExpectedDeliveryDate: {
		type: Date,
	},
	Incoterm: {
		type: String,
	},
	SourceReferenceID: {
		type: mongoose.Types.ObjectId,
		ref: Location,
	},
	DestinationReferenceID: {
		type: mongoose.Types.ObjectId,
		ref: Location,
	},
	CargoType: {
		type: String,
	},
	MaterialCode: {
		type: String,
	},
	Quantiy: {
		type: Number,
	},
	QuantityUnit: {
		type: String,
	},
	ShipmentNumber: {
		type: Number,
	},
});

// write save middleware which will run before every save .
productSchema.pre('save', async function (next) {
	try {
		await productValidationSchema.validateAsync(this.toObject());
		console.log('object is ', this.toObject());
		next();
	} catch (error) {
		next(error);
	}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
