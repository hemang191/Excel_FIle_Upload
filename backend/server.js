// server.js
const fastify = require('fastify')({ logger: true });

const sequelize = require('./connect_db');

const app = require('./app');

async function connectPsql() {
	try {
		await sequelize.authenticate();
		console.log('connected to postgres');
	} catch (error) {
		console.error('Unbale to connect db');
	}
}

connectPsql();
app.listen({ port: 3000 }, function (err, address) {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log('Listening on port 3000');
	// server is now listening to port
});
