
const Joi = require('joi') ; 
const expectedHeaders = [
    'Shipment Type*',
    'Order Number*',
    'Order Type (STO/PO/SO/RO)*',
    'Primary Mode*',
    'Expected Delivery Date*',
    'Incoterm*',
    'Source Reference ID*',
    'Destination Reference ID*',
    'Cargo Type*',
    'Material Code*',
    'Quantity*',
    'Quantity Unit*',
    'Shipment Number'
  ];
  
const validateHeaders= function validateHeaders(headers) 
{
    // Convert headers to lowercase for case-insensitive comparison
  
    const lowerCaseHeaders = headers.map(header => header.toLowerCase());
  
    // now check all the headers present match with our expected headers or not 
    const lowerCaseExpectedHeaders = expectedHeaders.map(header => header.toLowerCase());
  
    // Check if all expected headers are present
    const missingHeaders = lowerCaseExpectedHeaders.filter(header => !lowerCaseHeaders.includes(header));
  
    // if missingHeaders have length > 0 then it should return false and return the headers which are missing 
    return missingHeaders.length > 0 ? missingHeaders : null;
}

const cleanKeys = function cleanKeys(obj) {
    const cleanedObj = {};
    for (let key in obj) {
      // Remove '*', spaces, and words in parentheses using regex
      const cleanedKey = key.replace(/[*\s]+|\([^)]*\)/g, '');
      cleanedObj[cleanedKey] = obj[key];
    }
    return cleanedObj;
  }

  const productValidationSchema = Joi.object({
    ShipmentType: Joi.string().required(),
    OrderNumber: Joi.string().required(),
    OrderType: Joi.string().required(),
    PrimaryMode: Joi.string().required(),
    ExpectedDeliveryDate: Joi.date().iso().required(),
    Incoterm: Joi.string().required(),
    SourceReferenceId: Joi.string().required(),
    DestinationReferenceId: Joi.string().required(),
    CargoType: Joi.string().required(),
    MaterialCode: Joi.string().required(),
    Quantity: Joi.number().required(),
    QuantityUnit: Joi.string().required(),
    ShipmentNumber: Joi.number().required()
  });



// export always as an object then we are able to destructure it 

module.exports = { validateHeaders , cleanKeys  , productValidationSchema} ; 