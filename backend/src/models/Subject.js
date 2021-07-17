const { Schema, model } = require("mongoose")

const schema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
})

module.exports = model("Subject", schema)
