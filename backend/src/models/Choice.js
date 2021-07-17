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
    type: Number, // 120
    required: [true, "Goal is required"],
  },
  log: {
    type: [Object],
    default: [], // [ { start: number, stop: number | null } ]
  },
}, {
  timestamps: true
})

module.exports = model("Choice", schema)
