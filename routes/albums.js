const express = require('express');
const router = express.Router();
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

router.get('/search', csrfProtection, asyncHandler(async (req, res) => {
    const { search } = req.query
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
