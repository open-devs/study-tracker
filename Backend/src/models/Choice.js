const { Schema, model } = require("mongoose")

const schema = new Schema({
  subject: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Subject",
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  goal: {
    type: Number,
    required: [true, "Goal is required"],
  },
  elapsed: {
    type: Number,
    required: true,
    default: 0,
  },
  log: {
    type: [Object],
    required: false,
    default: [],
  },
})

module.exports = model("Choice", schema)
