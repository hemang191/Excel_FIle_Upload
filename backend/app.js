const fastify = require('fastify');
const cors = require('@fastify/cors');
const fastifyMultipart = require('@fastify/multipart');
const app = fastify();
app.register(cors);
app.register(fastifyMultipart);

app.register(require('./routes/excelRoutes'), {
	prefix: 'excelHandler',
});

module.exports = app;
