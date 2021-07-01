"use strict"

// External Dependancies
const boom = require("@hapi/boom")

// Get Data Models
const { Choice } = require("../models")

// Get all choices
const getAll = async (req, reply) => {
  try {
    const choices = await Choice.find()
    return choices
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single choice by ID
const getSingle = async (req, reply) => {
  try {
    const id = req.params.id
    const choice = await Choice.findById(id)
    return choice
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new choice
const add = async (req, reply) => {
  try {
    const choice = new Choice(req.body)
    return choice.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing choice
const update = async (req, reply) => {
  try {
    const id = req.params.id
    const choice = req.body
    const { ...updateData } = choice
    const update = await Choice.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a choice
const deleteOne = async (req, reply) => {
  try {
    const id = req.params.id
    const choice = await Choice.findByIdAndRemove(id)
    return choice
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getSingle,
  getAll,
  add,
  update,
  delete: deleteOne,
}
