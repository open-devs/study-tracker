"use strict"

// External Dependancies
const boom = require("@hapi/boom")
const fp = require("fastify-plugin")

// This plugins adds cookie ability to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async (req, res) => {
    try {
      if (req.url && (req.url.includes("auth") || req.url.includes("health")))
        return
      if (req.headers.authorization.split(' ')[1] !== 'null') {
        await req.jwtVerify();
      } else {
        const {
          output: { statusCode, payload },
        } = boom.unauthorized(`No Authorization token provided`)
        return res.code(statusCode).send(payload)
      }
    } catch (err) {
      const {
          output: { statusCode, payload },
        } = boom.unauthorized(`Authorization token invalid`)
        return res.code(statusCode).send(payload)
    }
  })
})
