'use strict'

const express = require('express')
const handler = require('../express-handler-boilerplate')

// filters the fields of an object
const keep = (...fields) => (obj) => {
  return fields.reduce((kept, field) => {
    kept[field] = obj[field]
    return kept
  }, {})
}

// pass a flickr api instance, get a router
module.exports = ({ flickr }) => {
  const router = express.Router()

  const getSizeUrls = async (photo) => {
    const response = await flickr.photos.getSizesAsync({
      photo_id: photo.id
    })
    return response.sizes.size.map(keep('width', 'height', 'url'))
  }
  
  const searchPhotos = async (options) => {
    options = Object.assign({}, { per_page: 10 }, options)
    const response = await flickr.photos.searchAsync(options)
    return response.photos.photo.map(keep('id', 'title'))
  }

  router.get('/', handler(async (req, res, next) => {
    const text = req.query.query
    const photos = await searchPhotos({ text })
    // an array of all the fetches we have to make for photo sizes
    const fetches = photos.map(photo => {
      return getSizeUrls(photo)
      .then(urls => {
        // inject the sizes into the photo object
        photo.urls = urls
      })
    })
    // perform all the fetches in parallel
    await Promise.all(fetches)
    res.json(photos)
  }))

  return router
}
