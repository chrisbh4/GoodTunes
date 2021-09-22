var express = require('express');
var router = express.Router();
// const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre, Shelf } = db
const { requireAuth } = require('../auth')

/* GET home page. */
router.get('/', csrfProtection, asyncHandler(async function (req, res, next) {
  const albums = await Album.findAll({
    order: [['ownerCount', 'DESC']],
    limit: 10
  })
  const reviews = await Review.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20,
    include: [Album, User]
  })
  const genres = await Genre.findAll()
  res.render('index', { title: 'GoodTunes', albums, reviews, genres });
}));

router.get('/test', csrfProtection, asyncHandler(async function (req, res, next) {
    var url = `https://api.discogs.com/releases/100`
    var apiKey = `${process.env.DC_KEY}`
    var apiSecret = `${process.env.DC_SECRET}`

    var response = await fetch(
      url,
      {
        "headers": {
          "key": apiKey,
          "secret": apiSecret
        }
      }
    )
    const result = await response.json()
    res.send(result)
}))

module.exports = router;
