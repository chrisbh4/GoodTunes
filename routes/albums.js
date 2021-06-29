const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre } = db
const { requireAuth } = require('../auth')

router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll({
        include: Genre,
        order: ['title']
    })
    res.render('all-albums', { albums })
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const album = await Album.findByPk(id, {
        include: Genre
    })
    const songs = await Song.findAll({
        where:
            { albumId: album.id }
    })
    const reviews = await Review.findAll({
        where: {
            albumId: album.id
        },
        include: User
    })
    res.render('album', { album, songs, reviews })
}))




module.exports = router;
