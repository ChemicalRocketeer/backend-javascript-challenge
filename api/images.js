'use strict'

const express = require('express')
const handler = require('../express-handler-boilerplate')

const flatmap = (arr, lambda) => [].concat(...arr.map(lambda))

module.exports = ({ flickr }) => {
  const router = express.Router()

  const getSize = async (photo) => {
    const response = await flickr.photos.getSizesAsync({
      photo_id: photo.id
    })
    return response
  }

  router.get('/', handler(async (req, res, next) => {
    const text = req.query.query
    const response = await flickr.photos.searchAsync({
      text,
      per_page: 10
    })
    // an array of all the fetches we have to make for photo sizes
    const fetches = flatmap(response.photos.photo, getSize)
    await Promise.all(fetches)
    res.json(response.photos.photo)
  }))

  return router
}
