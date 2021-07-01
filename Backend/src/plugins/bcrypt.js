"use strict"

const fp = require("fastify-plugin")

// This plugins adds bcrypt utility to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 10,
  })
})
