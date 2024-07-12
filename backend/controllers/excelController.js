const AwsS3Wrapper = require('../config/s3config');
const Excel = require('../utils/readExcel');
const { initiate } = require('../config/bullMq');
const Product = require('../models/productMongoModel');

const getUsers = (req, reply) => {
	reply.send('user');
};

const getFile = async (req, reply) => {
	try {
		const Products = await Product.find();
		if (Products.length === 0) {
			return reply.status(200).send({ message: 'nothing to show here' });
		}
		return reply.status(200).send({ file: Products });
	} catch (err) {
		console.log(err);
		reply.status(500).send({ error: 'failed to fetch object ' });
	}
};

const uploadFile = async (req, reply) => {
	try {
		console.log('Hello');

	

		const data = await req.file();

		
		
		const excelHandler = new Excel(data);

		const { jsonData, worksheet } = await excelHandler.readExcel();
		const stringData = JSON.stringify(jsonData);

		const isMatched = excelHandler.matchHeaders(worksheet);
		/*if(!isMatched)
			{
				return reply.send('Missing headers') ; 
			}
		*/
		const uploadS3 = new AwsS3Wrapper(stringData);
		// shift create bucket later so that it will call only one
		await uploadS3.createBucket();
		const uniqueKey = await uploadS3.putObject();

		// publishing is done here by putting the message into my queue
		await initiate({ jobName: 'ExcelHandling', filekey: uniqueKey });

		reply.status(200).send({ message: 'File will be stored ..' });
	} catch (err) {
		reply.status(500).send(err);
	}
};

module.exports = { getUsers, getFile, uploadFile };
