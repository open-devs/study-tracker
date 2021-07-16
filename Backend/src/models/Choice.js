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
    default: [], // [ { start: number, end: number | null } ]
  },
}, {
  timestamps: true
})

// 1. Route => GET all data of one day for a user using req.user._id { subject, goal, elapsed }
// 2. Route => PATCH start/stop to update log
// 3. Route => POST to create entry
// 4. Route => GET history of 7 days
// [{ date: "13/07", choices: [{ subject: "maths", goal: "120", log: [] }, { subject: "english", goal: "60", log: [] }] }, {}, {}]

module.exports = model("Choice", schema)
