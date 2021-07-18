"use strict"

// External Dependancies
const boom = require("@hapi/boom")
const bcrypt = require("bcryptjs")

// Get Data Models
const { User } = require("../models")

// Login a user
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      const {
        output: { statusCode, payload },
      } = boom.notFound(
        `Account with username: ${username} not found`
      )
      return res.code(statusCode).send(payload)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const {
        output: { statusCode, payload },
      } = boom.unauthorized(`Invalid credentials`)
      return res.code(statusCode).send(payload)
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
      const {
        output: { statusCode, payload },
      } = boom.unauthorized(
        `Account with following credentials: ${
          existingUser[0].email || existingUser[0].username || ""
        } already exists`
      )
      return res.code(statusCode).send(payload)
    }

    const salt = await bcrypt.genSalt(
      +process.env.PASSWORD_SALT_FACTOR
    )

    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      name: !name ? email.split("@")[0] ?? "test-name" : name,
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
