'use strict'

const warning = require('process-warning')()
warning.create('FastifyWarning.fastify-multipart', 'FST_MODULE_DEP_fastify-multipart'.toUpperCase(), 'fastify-multipart has been deprecated. Use @fastify/multipart@6.0.0 instead.')
warning.emit('FST_MODULE_DEP_fastify-multipart'.toUpperCase())

module.exports = require('fastify-multipart-deprecated')
