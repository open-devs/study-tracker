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
            usedBy: "number",
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
}
