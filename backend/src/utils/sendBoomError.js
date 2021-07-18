"use strict"

const sendBoomError = async (res, boomRet) => {
  const {
    output: { statusCode, payload },
  } = boomRet
  return res.code(statusCode).send(payload)
}

module.exports = sendBoomError
