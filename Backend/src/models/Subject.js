const { Schema, model } = require("mongoose")

const schema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  usedBy: {
    type: Number,
    default: 0,
    min: 0,
  },
})

module.exports = model("Subject", schema)
