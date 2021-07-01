const { Schema, model } = require("mongoose")

const schema = new Schema({
  subject: {
    required: true,
    ref: { type: Schema.Types.ObjectId, ref: "Subject" },
  },
  user: {
    required: true,
    ref: { type: Schema.Types.ObjectId, ref: "User" },
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
    type: [Mixed],
    required: false,
    default: [],
  },
})

module.exports = model("Choice", schema)
