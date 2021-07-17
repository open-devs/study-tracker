"use strict"

const fp = require("fastify-plugin")

// This plugins adds jwt functionality to fastify

module.exports = fp(async function (fastify, opts) {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()
  const secondsUntilEndOfDate =
    24 * 60 * 60 - h * 60 * 60 - m * 60 - s
  fastify.register(require("fastify-jwt"), {
    secret: process.env.JWT_SECRET,
    sign: {
      expiresIn: secondsUntilEndOfDate,
    },
  })
})
