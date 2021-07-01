"use strict"

const fp = require("fastify-plugin")

// This plugins adds cookie ability to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-cookie"))
})
