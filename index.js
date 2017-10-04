'use strict'

const { getFlickr } = require('./flickr-helper')
const imageApi = require('./api/images')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080;

(async function () {
  const app = express()
  app.use(morgan('tiny'))

  const flickr = await getFlickr()

  app.use('/images', imageApi({ flickr }))

  app.listen(PORT)
}())
