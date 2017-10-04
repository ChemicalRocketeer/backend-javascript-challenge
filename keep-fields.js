'use strict'

// filters the fields of an object
module.exports = (...fields) => (obj) => {
  return fields.reduce((kept, field) => {
    kept[field] = obj[field]
    return kept
  }, {})
}
