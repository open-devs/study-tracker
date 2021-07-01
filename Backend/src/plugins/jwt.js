"use strict"

const fp = require("fastify-plugin")

// This plugins adds jwt functionality to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: process.env.NODE_ENV === "production",
    },
  })
})
