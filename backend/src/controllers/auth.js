"use strict"

// External Dependancies
const boom = require("@hapi/boom")
const bcrypt = require("bcryptjs")
const { sendBoomError } = require('../utils')

// Get Data Models
const { User } = require("../models")

// Login a user
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return sendBoomError(res, boom.unauthorized(`Account with username: ${username} not found`))
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendBoomError(res, boom.unauthorized(`Invalid credentials`))
    }

    const token = await res.jwtSign({
      _id: user._id,
      email: user.email,
      username: user.username,
    })

    res.code(200).send({
      status: true,
      token,
    })
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new user
const signup = async (req, res) => {
  try {
    const { email, username, password, name } = req.body

    const existingUser = await User.find().or([
      { email },
      { username },
    ])

    if (existingUser?.length) {
      return sendBoomError(res, boom.unauthorized(`Account with following credentials: ${existingUser[0].email || existingUser[0].username || ""} already exists`))
    }

    const salt = await bcrypt.genSalt(
      +process.env.PASSWORD_SALT_FACTOR
    )

    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      name: name || email.split("@")[0],
      username,
    })
    await newUser.save()

    res.code(201).send({
      status: true,
    })
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  login,
  signup,
}
