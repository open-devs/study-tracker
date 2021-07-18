"use strict"

const { choice } = require("../controllers")
const { getAll, add, patch } = require("../schemas/choice")

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/choice",
    schema: { 200: {} },
    schema: getAll,
    handler: choice.getAll,
  })

  fastify.route({
    method: "POST",
    url: "/choice",
    schema: add,
    handler: choice.add,
  })

  fastify.route({
    method: "PATCH",
    url: "/choice/:id",
    schema: patch,
    handler: choice.update,
  })
}
