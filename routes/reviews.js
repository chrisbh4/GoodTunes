const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre } = db
const { requireAuth } = require('../auth')

router.get('/albums/:id', csrfProtection, asyncHandler(async(req,res) => {
    const id = req.params.id
    const album = await Album.findByPk(id, {
        include: Genre
    })
    res.render('review', {csrfToken: req.csrfToken(), album})
}))



module.exports= router;
