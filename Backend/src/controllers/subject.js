"use strict"

// External Dependancies
const boom = require("@hapi/boom")

// Get Data Models
const { Subject } = require("../models")

// Get all subjects
const getAll = async (req, reply) => {
  try {
    const subjects = await Subject.find()
    return subjects
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new subject
const add = async (req, reply) => {
  try {
    const subject = new Subject(req.body)
    return subject.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing subject
const update = async (req, reply) => {
  try {
    const id = req.params.id
    const subject = req.body
    const { ...updateData } = subject
    const update = await Subject.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a subject
const deleteOne = async (req, reply) => {
  try {
    const id = req.params.id
    const subject = await Subject.findByIdAndRemove(id)
    return subject
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getAll,
  add,
  update,
  delete: deleteOne,
}
