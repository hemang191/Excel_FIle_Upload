/*const Cities = require('../models/cityPgModel');
const Shipments = require('../models/shipmentPgModel');

class StoreData {
	constructor(data) {
		this.data = data;
	}

	convertKeysToLowerCase(obj) {
		const newObj = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				const newKey = key.charAt(0).toLowerCase() + key.slice(1);
				newObj[newKey] = obj[key];
			}
		}
		return newObj;
	}
	removeDuplicateCities(cities) {
		// Use an object to track unique referenceIds
		let seen = {};

		// Use filter to create a new array with unique cities
		cities.filter((city) => {
			let referenceId = city.referenceId;
			if (!seen.hasOwnProperty(referenceId)) {
				seen[referenceId] = true; // Mark referenceId as seen
				return true; // Include city in filtered array
			}
			return false; // Exclude city from filtered array
		});

		return cities;
	}

	async City(cleanedData) {
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

			console.log('source present', sourceCount);
			console.log('destination present', destCount);
		}

		// removing duplicates which are coming in cityArray

		let uniqueCityArray = removeDuplicateCities(cityArray);
		//console.log('unique city are', uniqueCityArray);
        await Cities.bulkCreate(uniqueCityArray);
		
		//await Cities.bulkCreate(uniqueCityArray);
	}

	async Shipment(cleanedData) {
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

        await Shipments.bulkCreate(smallData) ; 
		
	}
}

module.exports = StoreData;
*/
