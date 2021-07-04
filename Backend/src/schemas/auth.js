module.exports = {
  login: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string", minLength: 4, maxLength: 12 },
        password: { type: "string", minLength: 8, maxLength: 25 },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "boolean" },
          token: { type: "string" },
        },
      },
    },
  },
  signup: {
    body: {
      type: "object",
      required: ["username", "password", "email"],
      properties: {
        username: { type: "string", minLength: 4, maxLength: 12 },
        email: {
          type: "string",
          pattern:
            "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*",
        },
        password: { type: "string", minLength: 8, maxLength: 25 },
        name: {
          type: "string",
          minLength: 4,
          maxLength: 30,
          pattern: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          status: { type: "boolean" },
        },
      },
    },
  },
}
