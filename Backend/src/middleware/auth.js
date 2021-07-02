"use strict"

const fp = require("fastify-plugin")

// This plugins adds cookie ability to fastify

module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async (req, res) => {
    try {
      if (req.url && (req.url.includes("auth") || req.url.includes("health")))
        return
      console.log(req.url)
      await req.jwtVerify()
    } catch (err) {
      res.send(err)
    }
  })
})
