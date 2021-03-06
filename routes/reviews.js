const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { User, Review, Album, Song, Genre } = db
const { requireAuth } = require('../auth')
const { check, validationResult } = require('express-validator');

const reviewValidators = [
    check('comment')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a review')
      .isLength({ max: 255 })
      .withMessage('Username must not be more than 255 characters long'),
    check('rating')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a rating')
  ]

router.get('/albums/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const albumId = req.params.id
    const album = await Album.findByPk(albumId)
    if (!album) {
        var url = `https://api.discogs.com/masters/${id}?key=${process.env.DC_KEY}&secret=${process.env.DC_SECRET}`
        var response = await fetch(url)
        const newAlbum = await response.json()
        const createdAlbum = await Album.create({
            id: id,
            title: newAlbum.title,
            imgSrc: newAlbum.images[0].resource_url,
            releaseDate: newAlbum.year,
            artist: newAlbum.artists[0].name,
            genreId: 1,
            ownerCount: 0,
        })
        await createdAlbum.save()
    } else {
        album.save()
    }
    res.render('review', { csrfToken: req.csrfToken(), album })
}))

router.post('/albums/:id(\\d+)', reviewValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { userId } = req.session.auth
    const albumId = req.params.id
    const { comment, rating } = req.body
    const album = await Album.findByPk(albumId)
    const validatorErrors = validationResult(req)
    if(validatorErrors.isEmpty()){
        await Review.create({ comment, rating, albumId, userId });
        res.redirect(`/albums/${albumId}`)
    }else {
        const errors = validatorErrors.array().map(error => error.msg)
        res.render('review', { csrfToken: req.csrfToken(), album, errors, comment, rating })
    }

}))

router.post('/edits/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const { comment, rating } = req.body
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
