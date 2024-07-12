const AWS = require('aws-sdk');
const uuid = require('uuid');
// Configure the AWS SDK to use FakeS3
const s3 = new AWS.S3({
	endpoint: 'http://localhost:4569', // Replace with your FakeS3 endpoint if different
	s3ForcePathStyle: true, // Required for FakeS3
	accessKeyId: 'Hello', // FakeS3 doesn't enforce real AWS credentials  
	secretAccessKey: 'Hello',
});

// Example bucket name and object key

const bucketName = 'fake-bucket';

class AWSS3Wrapper {
	
	constructor(data) {
		//console.log(data) ;
		this.stringData = data;
		this.key = uuid.v4();
	}

	async createBucket() {
		try {
			const data = await s3.createBucket({ Bucket: bucketName }).promise();
			console.log('Bucket created');
		} catch (err) {
			console.log(err);
		}
	}

	async putObject() {
		try {
			await s3
				.putObject({
					Bucket: bucketName,
					Key: this.key,
					Body: this.stringData,
				})
				.promise();

			console.log('Object stored in S3 successfully', this.stringData);

			return this.key; // store in queue
		} catch {
			console.log('Fail to push object in S3');
			throw new Error('Error in putting object');
		}
	}

	async getObject(key) {
		try {
			const data = await s3
				.getObject({
					Bucket: bucketName,
					Key: key,
				})
				.promise();

			return data;
		} catch {
			console.log('Error came');
			throw new Error('Error in fetching object');
		}
	}

	async deleteObject() {
		try {
			await s3
				.deleteObject({
					Bucket: bucketName,
					Key: key,
				})
				.promise();

			console.log(`Object '${key}' deleted successfully.`);
		} catch {
			throw new Error('Error in deleting the object');
		}
	}
}

module.exports = AWSS3Wrapper;