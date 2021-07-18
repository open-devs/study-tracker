"use strict"

// External Dependancies
const boom = require("@hapi/boom")
const fp = require("fastify-plugin")
const { sendBoomError } = require('../utils')

// This plugins adds cookie ability to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async (req, res) => {
    try {
      if (
        req.url &&
        req.url.includes("api") &&
        !(req.url.includes("auth") || req.url.includes("health"))
      ) {
        if (req.headers.authorization.split(" ")[1] !== "null") {
          await req.jwtVerify()
        } else {
          return sendBoomError(res, boom.unauthorized(`No Authorization token provided`))
        }
      } else {
        return
      }
    } catch (err) {
      return sendBoomError(res, boom.unauthorized(`Authorization token invalid`))
    }
  })
})
