module.exports = {
  getAll: {
    response: {
      200: {
        type: "array",
        uniqueItems: true,
        item: {
          type: "object",
          properties: {
            title: "string",
          },
        },
      },
    },
  },
  add: {
    body: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string" },
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
  addMultiple: {
    body: {
      type: "array",
      item: {
        type: "string",
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
