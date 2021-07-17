"use strict"

const { subject } = require("../controllers")
const { getAll, add, addMultiple } = require("../schemas/subject")

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/subject",
    schema: getAll,
    handler: subject.getAll,
  })

  fastify.route({
    method: "POST",
    url: "/subject",
    schema: addMultiple,
    handler: subject.addMultiple,
  })
}
