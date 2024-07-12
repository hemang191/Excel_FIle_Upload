const { Sequelize } = require('sequelize');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const sequelize = new Sequelize('postgres', 'postgres', process.env.Password, {
	host: 'localhost',
	dialect: 'postgres',
});

const DB = process.env.DATABASE;

mongoose
	.connect(DB)
	.then(() => console.log('Connected to database successfully'))
	.catch((err) => console.log(err));

module.exports = sequelize;
