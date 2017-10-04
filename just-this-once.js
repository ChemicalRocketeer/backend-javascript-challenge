'use strict'

const P = require('bluebird')
const EventEmitter = require('events')

// returns a function which fulfills when the given promise is completed,
// or resolves immediately if the result is already available.
module.exports = (promis) => {
  const emitter = new EventEmitter()
  let done = false;
  let theResult = undefined;
  let theError = undefined;

  promis.then(result => {
    theResult = result
    emitter.emit('resolve', result)
  })
  .catch(err => {
    theError = err
    emitter.emit('reject', err)
  })
  .finally(() => {
    done = true
  })

  return () => {
    if (!done) {
      return new P((resolve, reject) => {
        emitter.on('resolve', resolve)
        emitter.on('reject', reject)
      })
    } else if (theError) {
      return P.reject(theError)
    } else {
      return P.resolve(theResult)
    }
  }
}