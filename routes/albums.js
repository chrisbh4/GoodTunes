const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre, Shelf } = db
const { requireAuth } = require('../auth')
const { Op } = require('sequelize')

router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    if (req.session.auth) {
        const { userId } = req.session.auth
        const albums = await Album.findAll({
            include: Genre,
            order: ['title']
        })
        const shelves = await Shelf.findAll({
            where: { userId }
        })
        res.render('all-albums', { albums, shelves, csrfToken: req.csrfToken() })
    } else {
        const albums = await Album.findAll({
            include: Genre,
            order: ['title']
        })
        res.render('all-albums', { albums, csrfToken: req.csrfToken() })
    }
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = req.params.id
    var url = `https://api.discogs.com/releases/${id}`
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
    const album = await response.json()

    //TODO: Add Reviews

    res.render('album', { album })




    // const id = req.params.id
    // const album = await Album.findByPk(id, {
    //     include: Genre
    // })
    // const songs = await Song.findAll({
    //     where:
    //         { albumId: album.id }
    // })
    // const reviews = await Review.findAll({
    //     where: {
    //         albumId: album.id
    //     },
    //     include: User
    // })
    // res.render('album', { album, songs, reviews })
}))

router.get('/search', csrfProtection, asyncHandler(async (req, res) => {
    const { search } = req.query
    // const searchResults = await fetch(`https://api.discogs.com/database/search?q=${search}&key=${process.env.DC_KEY}&secret=${process.env.DC_SECRET}`)
    // const results = await searchResults.json()
    // res.send(results)
    console.log(`-----------------${search}-----------------`)
    const albums = await Album.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.iLike]: '%' + search + '%' } },
                { artist: { [Op.iLike]: '%' + search + '%' } },
            ]
        },
        include: Genre
    })
    const { userId } = req.session.auth
    const shelves = await Shelf.findAll({
        where: { userId }
    })
    console.log(`-----------------${albums}-----------------`)
    res.render('all-albums', { albums, shelves, csrfToken: req.csrfToken() })
}))





module.exports = router;
