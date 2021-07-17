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

// 4. Route => GET history of 7 days
// [{ date: "13/07", choices: [{ subject: "maths", goal: "120", log: [] }, { subject: "english", goal: "60", log: [] }] }, {}, {}]

module.exports = model("Choice", schema)
