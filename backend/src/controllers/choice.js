"use strict"

// External Dependancies
const boom = require("@hapi/boom")

// Get Data Models
const { Choice, Subject } = require("../models")

const getMaxStopTime = (createdAt, goal) => {
  const maxStop = new Date(createdAt)
  maxStop.setUTCMinutes(maxStop.getUTCMinutes() + goal)
  return maxStop
}

const getElapsedTime = (createdAt, goal, log) => {
  let elapsedMs = 0
  const maxStop = getMaxStopTime(createdAt, goal)
  /**
   * Add time from all {start, stop} log
   */
  log.forEach((_log) => {
    if (_log.stop != null) {
      elapsedMs += _log.stop - _log.start
    }
  })
  /**
   * If the last log has has "start" event but no "stop event", add that as well
   */
  if (log.length > 0 && log[log.length - 1].stop == null) {
    elapsedMs +=
      Math.min(maxStop.valueOf(), new Date().valueOf()) -
      log[log.length - 1].start
  }
  return elapsedMs
}

const groupChoicesOnDate = (choices) => {
  const gp = {}
  choices.forEach((choice) => {
    const date = new Date(choice.createdAt)
      .toISOString()
      .split("T")[0]
    if (date in gp) {
      gp[date].push(choice)
    } else {
      gp[date] = [choice]
    }
  })
  return Object.keys(gp).map((date) => ({ date, choices: gp[date] }))
}

// Get all choices of user for a given day.
const getAll = async (req, res) => {
  try {
    const { start } = req.query
    const { _id: userId } = req.user
    const $gte = new Date(start).toISOString()
    const choices = await Choice.find({
      user: userId,
      createdAt: {
        $gte,
      },
    }, { user: 0, __v: 0 }).populate("subject")
    const res = choices
      .map((x) => x.toObject())
      .map((x) => ({
        ...x,
        elapsed: getElapsedTime(x.createdAt, x.goal, x.log),
      }))
    return groupChoicesOnDate(res)
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new choice
const add = async (req, res) => {
  try {
    const { _id: userId } = req.user
    const response = []
    for (const { subject, goal } of req.body) {
      const subjectName = await Subject.find({ title: subject })
      if (subject.length) {
        const choice = new Choice({
          subject: subjectName[0]._id,
          user: userId,
          goal,
          log: [],
        })
        await choice.save()
        response.push(true)
      }
    }
    return response
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing choice by pushing a log entry into logs array
const updateLog = async (req, res) => {
  try {
    const id = req.params.id
    const { _id: userId } = req.user
    const { eventType } = req.body
    const choice = await Choice.findById(id)
    if (choice == null) {
      throw new Error("Choice with given id not found")
    }
    const choiceUserId = choice.user.toString() // ObjectId to string
    if (choiceUserId !== userId) {
      throw new Error("This choice does not belong to you.")
    }
    /**
     * Make sure that the choice hasn't expired, i.e. choice createdAt + goal time should be
     * less than equals to current time
     */
    const maxStopTime = getMaxStopTime(choice.createdAt, choice.goal)
    if (maxStopTime.valueOf() < new Date().valueOf()) {
      throw new Error(
        "Choice has expired. Cannot start or stop the timer now."
      )
    }
    const prevLogs = choice.log
    if (eventType === "start") {
      /**
       * If it's a "start" event, then we push a new event in the log array with `stop` field set to `null`.
       */
      if (
        prevLogs.length > 0 &&
        prevLogs[prevLogs.length - 1].stop == null
      ) {
        throw new Error(
          `Timer must be stopped first beforing starting again.`
        )
      }
      const newLogs = [
        ...prevLogs,
        { start: new Date().valueOf(), stop: null },
      ]
      await choice.update({ $set: { log: newLogs } })
      return { ...choice.toJSON(), log: newLogs }
    } else if (eventType === "stop") {
      /**
       * If it's a "stop" event, then we take the last "start" event and update it's stop time
       */
      if (
        prevLogs.length === 0 ||
        prevLogs[prevLogs.length - 1].stop != null
      ) {
        throw new Error(
          `'stop' event must have a corresponding 'start' event`
        )
      }
      prevLogs[prevLogs.length - 1].stop = new Date().valueOf()
      await choice.update({ $set: { log: prevLogs } })
      return { ...choice.toJSON(), log: prevLogs }
    }
    throw new Error("Unknown event type.")
  } catch (err) {
    throw boom.boomify(err)
  }
}

module.exports = {
  getAll,
  add,
  update: updateLog,
}
