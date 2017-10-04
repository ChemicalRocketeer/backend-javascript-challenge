'use strict'

const express = require('express')
const router = express.Router()
const handler = require('../express-handler-boilerplate')
const { getFlickr } = require('../flickr-helper')

const flatmap = (arr, lambda) => [].concat(...arr.map(lambda))

router.get('/', handler(async (req, res, next) => {
  const flickr = await getFlickr()
  const text = req.query.query
  const response = await flickr.photos.searchAsync({
    text,
    per_page: 10
  })
  res.json(response.photos.photo)
}))

module.exports = router