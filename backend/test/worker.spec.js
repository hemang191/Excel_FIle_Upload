

const chai = require('chai');
const sinon = require('sinon');
const { expect } = chai;

const awsS3 = require('./../config/s3config');
const excel = require('./../utils/readExcel');
const cityPgModel = require('./../models/cityPgModel');
const shipmentPgModel = require('./../models/shipmentPgModel');
const locationMongoModel = require('./../models/locationMongoModel');
const productMongoModel = require('./../models/productMongoModel');
const target = require('./../worker');

describe('worker check', () => {
	let awsS3Mock;
	let excelMock;
	let cityPgModelMock;
	let shipmentPgModelMock;
	let productMongoModelMock;
	let locationMongoModelMock;
	const mockJob = {
		data: {
			filekey: 'mock-file-key',
		},
	};

	beforeEach(() => {
		awsS3Mock = sinon.mock(awsS3);
		excelMock = sinon.mock(excel.prototype);
		cityPgModelMock = sinon.mock(cityPgModel);
		shipmentPgModelMock = sinon.mock(shipmentPgModel);
		productMongoModelMock = sinon.mock(productMongoModel);
		locationMongoModelMock = sinon.mock(locationMongoModel);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should handle location already present', async () => {
		// Arrange
		const mockFileData = [
			{
				ShipmentType: 'Aloha',
				OrderNumber: 'MAMA-10',
				OrderType: 'STO',
				PrimaryMode: 'Ocean',
				ExpectedDeliveryDate: '10/24/2024',
				Incoterm: 'MAN',
				SourceReferenceID: 'Chennai',
				DestinationReferenceID: 'Delhi',
				CargoType: 'PTL',
				MaterialCode: 'Gokul',
				QuantityXYZ: 20,
				QuantityUnit: 'Pcs',
				ShipmentNumber: 125,
			},
		];
		//awsS3Mock
		//	.expects('getObject')
		//	.resolves({ Body: Buffer.from(JSON.stringify(mockFileData)) });
		excelMock.expects('cleanData').resolves(mockFileData);
		cityPgModelMock.expects('count').resolves(1);
		cityPgModelMock.expects('bulkUpdate').resolves({});

		cityPgModelMock.expects('findOne').resolves({ id: 1 });

		shipmentPgModelMock.expects('bulkCreate').resolves({});

		productMongoModel.expects('insertMany').resolves({});
		// Act
		try {
			await target(mockJob);

			// Assert
			expect(awsS3Mock.expects('getObject').calledOnce).to.be.true;
			expect(excelMock.expects('cleanData').calledOnce).to.be.true;
			expect(cityPgModelMock.expects('count').calledOnce).to.be.true;
			expect(cityPgModelMock.expects('bulkUpdate').calledOnce).to.be.true;

			// Verify all mocks
			awsS3Mock.verify();
			excelMock.verify();
			cityPgModelMock.verify();
			shipmentPgModelMock.verify();
			locationMongoModelMock.verify();
			productMongoModelMock.verify();
		} catch (error) {
			// Handle any unexpected errors
			console.error(error);
			throw error;
		}
	});
});
