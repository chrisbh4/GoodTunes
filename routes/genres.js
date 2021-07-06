const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre, Shelf } = db
const { requireAuth } = require('../auth')

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    if (req.session.auth) {
        const { userId } = req.session.auth
        const albums = await Album.findAll({
            where: { genreId: id }
        })
        const shelves = await Shelf.findAll({
            where: { userId }
        })
        res.render('genre', { albums, shelves, csrfToken: req.csrfToken() })
    } else {
        const albums = await Album.findAll({
            where: { genreId: id }
        })
        res.render('genre', { albums, csrfToken: req.csrfToken() })
    }
}))



module.exports = router;
