const Worker = require('bull');
const AWSS3Wrapper = require('./config/s3config');
const { ObjectId } = require('mongodb');
const Excel = require('./utils/readExcel');
const awsS3 = new AWSS3Wrapper();
const Product = require('./models/productMongoModel');
const Location = require('./models/locationMongoModel');
const Cities = require('./models/cityPgModel');
const sequelize = require('./connect_db');
const Shipment = require('./models/shipmentPgModel');
//const StoreData = require('./utils/storeData');
// connecting to that queue so that it can processed ...
const queue = new Worker('myQueue', {
	redis: {
		host: 'localhost',
		port: 6379,
	},
});

const processJob = async (job) => {
	// now we are going to process whatqueue is present inside our queue
	//console.log(' procesing job ');

	const obj = await awsS3.getObject(job.data.filekey);
	
	const objectBuffer = obj.Body;
	

	const convertedData = objectBuffer.toString('utf-8');
	// it converted into string typeof
	const jsonConversion = JSON.parse(convertedData);

	const excel = new Excel();
	const cleanedData = excel.cleanData(jsonConversion);

	function convertKeysToLowerCase(obj) {
		const newObj = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				const newKey = key.charAt(0).toLowerCase() + key.slice(1);
				newObj[newKey] = obj[key];
			}
		}
		return newObj;
	}
	const cityArray = [];

	for (let i = 0; i < cleanedData.length; i++) {
		const objSourceReference = cleanedData[i].SourceReferenceID; // Delhi
		const objDestinationReference = cleanedData[i].DestinationReferenceID; // Chennai

		// going to check that it is present in db or not
		const sourceCount = await Cities.count({
			where: { referenceId: objSourceReference },
		});
		const destCount = await Cities.count({
			where: { referenceId: objDestinationReference },
		});
		if (sourceCount == 0) {
			cityArray.push({ referenceId: objSourceReference });
		}

		if (destCount == 0) {
			cityArray.push({ referenceId: objDestinationReference });
		}
	}

	// removing duplicates which are coming in cityArray
	function removeDuplicateCities(cities) {
		// Use an object to track unique referenceIds
		let seen = {};

		// Use filter to create a new array with unique cities
		return cities.filter((city) => {
			let referenceId = city.referenceId;
			if (!seen.hasOwnProperty(referenceId)) {
				seen[referenceId] = true; // Mark referenceId as seen
				return true; // Include city in filtered array
			}
			return false; // Exclude city from filtered array
		});
	}


	// data here is storing in SQL of locations 
	let uniqueCityArray = removeDuplicateCities(cityArray);
	//console.log('unique city are', uniqueCityArray);
	const storedCity = await Cities.bulkCreate(uniqueCityArray);

	const smallData = [];
	for (let i = 0; i < cleanedData.length; i++) {
		// now here we can edit cleanData[i] , firstly we can fetch the location primary key store in my table
		const sourceId = await Cities.findOne({
			where: { referenceId: cleanedData[i].SourceReferenceID },
		});

		const destinationId = await Cities.findOne({
			where: { referenceId: cleanedData[i].DestinationReferenceID },
		});
		//console.log('-------------', 	sourceId);
		cleanedData[i].sourceReferenceId = sourceId.id;
		cleanedData[i].destinationReferenceId = destinationId.id;
		//cleanData[i].SourceReferenceID =
		smallData.push(convertKeysToLowerCase(cleanedData[i]));
	}

	// push our excel file data to SQL model name Shipment
	const storedShipments = await Shipment.bulkCreate(smallData);



	// MONGODB  STUFF
	for (let index = 0; index < cleanedData.length; index++) {
		const location = cleanedData[index];
		const dest = await Location.create({
			locationName: location.DestinationReferenceID,
		});

		cleanedData[index].DestinationReferenceID = new ObjectId(dest._id);
		const source = await Location.create({
			locationName: location.SourceReferenceID,
		});
		cleanedData[index].SourceReferenceID = new ObjectId(source._id);
	}

	// store the data in MONGODB

	//console.log('Cleaned data is----> ', cleanedData);

	try {
		//console.log(JSON.stringify(Product));
		await Product.collection.insertMany(cleanedData);

		//console.log('data successfully stored ', Product.find({}));
		//reply.send({ status: 'success' });
	} catch (error) {
		console.error('Error saving product:', error);
	}
};

// create a  instance of worker which is goint to processJob

async function connectPsql() {
	try {
		await sequelize.authenticate();
		console.log('connected to postgres');
	} catch (error) {
		console.error('Unbale to connect db');
	}
}

connectPsql();
queue.process(async (job) => {
	//console.log(job.data);
	await processJob(job);
});

queue.on('completed', (job) => {
	console.log(`job has completed!`);
});

queue.on('failed', (job, err) => {
	console.log('-----', err);
	console.log(` it has failed  `);
});

console.log('worker started');

module.exports = processJob;
// take the connection with mongo db over here
