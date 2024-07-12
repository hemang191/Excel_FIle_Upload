function convertKeysToLowerCase(obj) {
	const newObj = {};
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			const newKey = key.charAt(0).toLowerCase() + key.slice(1);
			newObj[newKey] = obj[key];
		}
	}
	return newObj;
};

module.exports = convertKeysToLowerCase ; 
