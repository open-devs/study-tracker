"use strict"

// Read the .env file.
require("dotenv").config()

// Require the framework
const Fastify = require("fastify")

// Require library to exit fastify process, gracefully (if possible)
const closeWithGrace = require("close-with-grace")

// Require mongoose to connect to mongodb
const mongoose = require("mongoose")

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    redact: ["req.headers.authorization", "req.body.password"],
    level: "info",
    prettyPrint: true,
  },
})

// Register your application as a normal plugin.
const appService = require("./src/app")
app.register(appService)

mongoose
  .connect(
    process.env.MONGOOSE_CONNECTION_STRING ||
      `mongodb://localhost/study-tracker-db`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(`Mongoose connected successfully`))
  .catch(async (err) => {
    app.log.error(err.message)
    process.exit(1)
  })

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: 500 },
  async ({ signal, err, manual }) => {
    if (err) {
      app.log.error(err)
    }
    await app.close()
  }
)

app.addHook("onClose", async (instance, done) => {
  mongoose.disconnect()
  closeListeners.uninstall()
  done()
})

// Start listening.
app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
