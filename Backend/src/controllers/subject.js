"use strict"

// External Dependancies
const boom = require("@hapi/boom")

// Get Data Models
const { Subject } = require("../models")

// Get all subjects
const getAll = async (req, res) => {
  try {
    const subjects = await Subject.find()
    return subjects
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new subject
const add = async (req, res) => {
  try {
    const subject = new Subject(req.body)
    return subject.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getAll,
  add,
}
