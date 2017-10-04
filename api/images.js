'use strict'

const express = require('express')
const handler = require('../express-handler-boilerplate')

// pass a flickr api instance, get a router
module.exports = ({ flickr }) => {
  const router = express.Router()

  router.get('/', handler(async (req, res, next) => {
    const text = req.query.query
    const photos = await flickr.searchPhotos({ text })
    // an array of all the fetches we have to make for photo sizes
    const fetches = photos.map(photo => {
      return flickr.getPhotoUrls(photo)
      .then(urls => {
        // inject the urls into the photo object
        photo.urls = urls
      })
    })
    // perform all the fetches in parallel
    await Promise.all(fetches)
    res.json(photos)
  }))

  return router
}
