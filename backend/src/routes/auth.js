"use strict"

const { auth } = require("../controllers")
const { login, signup } = require("../schemas/auth")

module.exports = async function (fastify, opts) {
  fastify.route({
    method: "POST",
    url: "/auth/login",
    schema: login,
    handler: auth.login,
  })

  fastify.route({
    method: "POST",
    url: "/auth/signup",
    schema: signup,
    handler: auth.signup,
  })
}
