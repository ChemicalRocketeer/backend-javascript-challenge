'use strict'

const { getFlickr } = require('./flickr-helper')
const imageApi = require('./api/images')
const express = require('express')
const PORT = process.env.PORT || 8080

(async () => {
  const app = express()

  const flickr = await getFlickr()

  app.use('/images', imageApi(flickr))

  app.listen(PORT)
})()