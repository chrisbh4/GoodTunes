var express = require('express');
var router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre, Shelf } = db
const { requireAuth } = require('../auth')

/* GET home page. */
router.get('/', csrfProtection, asyncHandler(async function(req, res, next) {
  const albums = await Album.findAll({
    order: [['ownerCount', 'DESC']],
    limit: 10
  })
  const reviews = await Review.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20,
    include: [ Album, User]
  })
  res.render('index', { title: 'GoodTunes', albums, reviews });
}));

module.exports = router;
