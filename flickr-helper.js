'use strict'

const P = require('bluebird')
const Flickr = require('flickrapi')
// convert flickr's methods to promisey ones
P.promisifyAll(Flickr)

const flickrOptions = {
  api_key: '80aafb8d5879b4ab3d58a6543021cd59',
  progress: false // suppress progress bars in stdout
}

const getFlickr = async () => {
  const flickr = await Flickr.tokenOnlyAsync(flickrOptions)
  P.promisifyAll(flickr)
  P.promisifyAll(flickr.photos)
  return flickr
}

module.exports = {
  getFlickr
}
