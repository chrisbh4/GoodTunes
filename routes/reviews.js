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
    // const reviews = await Review.findAll({
    //     where: {
    //         albumId: album.id
    //     },
    //     include: User
    // })
    res.render('review', {csrfToken: req.csrfToken(), album})
}))

router.post('/albums/:id', csrfProtection, asyncHandler(async(req, res) => {
    const { userId }= req.session.auth
    const albumId = req.params.id
    const { comment, rating } = req.body
    await Review.create({ comment, rating, albumId, userId });
    res.redirect(`/albums/${albumId}`)
}))



module.exports= router;
