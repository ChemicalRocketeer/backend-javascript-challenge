'use strict'

const P = require('bluebird')
const express = require('express')
const handler = require('../express-handler-boilerplate')

// pass a flickr api instance, get a router
module.exports = ({ flickr }) => {
  const router = express.Router()

  router.get('/', handler(async (req, res, next) => {
    const text = req.query.query
    let photos = await flickr.searchPhotos({ text })
    // fetch all the photo sizes and add them to the photo objects
    photos = await P.map(photos, async (photo) => {
      const urls = await flickr.getPhotoUrls(photo)
      return Object.assign({}, photo, { urls })
    })
    res.json(photos)
  }))

  return router
}
