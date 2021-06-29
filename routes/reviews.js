const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre } = db
const { requireAuth } = require('../auth')

router.get('/albums/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const albumId = req.params.id
    const album = await Album.findByPk(albumId, {
        include: [Genre]
    })
    res.render('review', { csrfToken: req.csrfToken(), album })
}))

router.post('/albums/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const albumId = req.params.id
    const { comment, rating } = req.body
    await Review.create({ comment, rating, albumId, userId });
    res.redirect(`/albums/${albumId}`)
}))

router.post('/edits/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const { comment, rating } = req.body
    console.log(comment, rating)
    const review = await Review.findByPk(id)
    review.comment = comment
    review.rating = rating
    await review.save()
    res.redirect(`/shelves/users/${review.userId}`)
}))

router.post('/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const review = await Review.findByPk(id)
    await review.destroy()
    res.redirect(`/shelves/users/${review.userId}`)
}))


module.exports = router;
