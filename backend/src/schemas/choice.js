module.exports = {
  getAll: {
    querystring: {
      type: "object",
      required: ["start", "end"],
      properties: {
        start: { type: "string", length: 10 },
        end: { type: "string", length: 10 },
      },
    },
    response: {
      200: {
        type: "array",
      },
    },
  },
  add: {
    body: {
      type: "object",
      required: ["subject", "goal"],
      properties: {
        subject: { type: "string", minLength: 20, maxLength: 30 },
        goal: { type: "number", minimum: 1, maximum: 1440 },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          subject: { type: "string" },
          user: { type: "string" },
          goal: { type: "number" },
          elapsed: { type: "number" },
          log: { type: "array" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
    },
  },
  patch: {
    params: {
      type: "object",
      properties: {
        id: { type: "string", minLength: 20, maxLength: 30 },
      },
    },
    body: {
      type: "object",
      required: ["eventType"],
      properties: {
        eventType: { type: "string", enum: ["start", "stop"] },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          subject: { type: "string" },
          user: { type: "string" },
          goal: { type: "number" },
          log: { type: "array" },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
    },
  },
}
