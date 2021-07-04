"use strict"

module.exports = async function (fastify, opts) {
  fastify.get("/health", async function (request, res) {
    return { status: true }
  })
}
