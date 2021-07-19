"use strict"

const path = require("path")
const AutoLoad = require("fastify-autoload")
const FastifyStatic = require("fastify-static")

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require("fastify-cors"), {
    origin: (origin, cb) => {
      let corsOptions = {
        origin: false,
      }
      if (
        origin === undefined ||
        /localhost/.test(origin) ||
        /127.0.0.1/.test(origin)
      ) {
        cb(null, corsOptions)
        return
      }

      if (new RegExp(process.env.PROD_DEPLOYMENT_URL).test(origin)) {
        corsOptions.origin = true
        cb(null, corsOptions)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"))
    },
  })

  fastify.register(FastifyStatic, {
    root: path.join(__dirname, "../dist"),
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "middleware"),
    ignorePattern: /.*.md/,
    options: Object.assign({}, opts),
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    ignorePattern: /.*.md/,
    options: Object.assign({}, opts),
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    ignorePattern: /.*.md/,
    options: Object.assign(
      {
        prefix: "/api",
      },
      opts
    ),
  })

  // Not found handler
  fastify.setNotFoundHandler((req, res) => {
    // // API 404
    if (req.raw.url && req.raw.url.startsWith("/api")) {
      return res.status(404).send({
        success: false,
        error: {
          kind: "user_input",
          message: "Not Found",
        },
      })
    }

    // Vue SPA
    res.status(200).sendFile("dist/index.html")
  })
}
