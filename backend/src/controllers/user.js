"use strict"

// External Dependancies
const boom = require("@hapi/boom")

// Get Data Models
const { User } = require("../models")

// Get single user by ID
const getSingle = async (req, res) => {
  try {
    const id = req.user
    const user = await User.findById(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
const add = async (req, res) => {
  try {
    const user = new User(req.body)
    return user.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing user
const update = async (req, res) => {
  try {
    const id = req.params.id
    const user = req.body
    const { ...updateData } = user
    const update = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a user
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)
    return user
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getSingle,
  add,
  update,
  delete: deleteOne,
}
