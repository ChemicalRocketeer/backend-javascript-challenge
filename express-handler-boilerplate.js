'use strict'

// just gets rid of some ugly try/catch boilerplate because express can't be bothered to wrap it themselves
module.exports = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}
