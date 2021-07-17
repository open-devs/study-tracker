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


// Add new subjects
const addMultiple = async (req, res) => {
  try {
    let data = req.body.map(el => ({ title: el }))
    return await Subject.insertMany(data)
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getAll,
  addMultiple
}
