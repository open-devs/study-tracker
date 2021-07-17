"use strict"

const path = require("path")
const AutoLoad = require("fastify-autoload")

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require('fastify-cors'), {
    origin: (origin, cb) => {
      let corsOptions = {
        origin: false,
      }
      if (/localhost/.test(origin) || /127.0.0.1/.test(origin)) {
        corsOptions.origin = true
        cb(null, corsOptions)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"))
    }
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "middleware"),
    options: Object.assign({}, opts),
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign(
      {
        prefix: "/api",
      },
      opts
    ),
  })
}
