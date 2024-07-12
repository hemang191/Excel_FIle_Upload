const excelControllers = require('../controllers/excelController');

class Excel {
	static async getRoutes(fastify) {
		//await fastify.register(require('@fastify/express'))
		fastify.get('/', excelControllers.getUsers);
		fastify.get('/upload', excelControllers.getFile);
		fastify.post('/upload', excelControllers.uploadFile);
	}
}

module.exports = Excel.getRoutes;
