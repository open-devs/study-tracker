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
    minLength: [4, "Username should be minimum of 4 letters"],
    maxLength: [12, "Username should be maximum of 12 letters"],
  },
  name: {
    type: String,
    trim: true,
    minLength: [4, "Name should be minimum of 4 letters"],
    maxLength: [30, "Name should be maximum of 30 letters"],
    validate: {
      validator: (v) => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(v),
      message: (props) => `${props.value} is not a valid name!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
})

module.exports = model("User", schema)
