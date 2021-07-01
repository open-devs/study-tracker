const { Schema, model } = require("mongoose")

const schema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    validate: {
      validator: (v) =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        ),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
    trim: true,
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    maxLength: [25, "Password should be maximum 25 letters"],
    minLength: [8, "Password should be minimum 8 letters"],
  },
})

module.exports = model("User", schema)
