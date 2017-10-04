'use strict'

const keep = require('./keep-fields')
const P = require('bluebird')
const Flickr = require('flickrapi')
// convert flickr's methods to promisey ones
P.promisifyAll(Flickr)

const flickrOptions = {
  api_key: '80aafb8d5879b4ab3d58a6543021cd59',
  progress: false // suppress progress bars in stdout
}

// returns an abstracted flickr api wrapper, with methods to do things that we care about
const getFlickr = async () => {
  const flickr = await Flickr.tokenOnlyAsync(flickrOptions)
  P.promisifyAll(flickr.photos)

  return {
    searchPhotos: async (options) => {
      options = Object.assign({}, { per_page: 10 }, options)
      const response = await flickr.photos.searchAsync(options)
      return response.photos.photo.map(keep('id', 'title'))
    },

    getPhotoUrls: async (photo) => {
      const response = await flickr.photos.getSizesAsync({
        photo_id: photo.id
      })
      return response.sizes.size.map(keep('width', 'height', 'url'))
    }
  }
}

module.exports = {
  getFlickr
}
