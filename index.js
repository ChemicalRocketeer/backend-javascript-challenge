'use strict'

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.use('/images', require('./api/images'))

app.listen(PORT)