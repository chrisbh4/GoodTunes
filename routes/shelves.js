const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const user = require('../db/models/user');
const { User, Shelf, Review, Album, AlbumList } = db;

/*
[] create a get route to return all shelves for a single user
    (shows all shelves)
Path: shelves/user:id/

[] create a post route to create a new shelf for the logged in user
    Path: shelves/user:id/
    []create a form in pug to be able to create a new shelve
        [] (future) checkboxes to add/move albums to multiple shelves

[] create a put route to edit a shelf name for the logged in user
    Path: /shelf/shelf:id
    [] create a button to edit/delete

[] create a delete route to destory a shelf for the logged in user
    Path: /shelf/shelf:id
    [] create a button to edit/delete

[] update the pug files to show changes made by the user
    [] create a button to edit/delete buttons in a pug file
*/
// Make sure the user can only access its own shelves and not anyone else's in the database

router.get('/users/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10)
    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: Album
    })
    // Grabs all of the logged in user's Shelves
    // findAll shelves for a user and include all of the albums in the shelf
    const shelves = await Shelf.findAll({
        where: {
            userId
        },
        include: [{
            model: Album
        }]
    })
    // const shelfAlbums = shelves[0].dataValues.Albums[0].dataValues.imgSrc

    // const shelves = await Shelf.findAll({ where: { userId }, include: AlbumList})


    res.render('shelves-detail', {
        shelves,
        userId,
        reviews,
        csrfToken: req.csrfToken()
    })
}))



router.post('/users/:id(\\d+)', asyncHandler(async (req, res, next) => {
    // console.log('in route!')
    const userId = parseInt(req.params.id, 10)
    const name = req.body.name
    await Shelf.create({
        name,
        userId
    });
    const shelves = await Shelf.findAll({ where: { userId } })
    res.json({ shelves })

}))

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const shelf = await Shelf.findByPk(id)
    const albumList = await AlbumList.findAll({
        where: {
            shelfId: id
        }
    })
    const albums = []
    for (let i = 0; i < albumList.length; i++) {
        let album = await Album.findByPk(albumList[i].albumId)
        albums.push(album)
    }

    res.render('shelf-detail', {
        shelf,
        albums,
        csrfToken: req.csrfToken()
    })

}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = req.params.id
    const shelf = await Shelf.findByPk(id, {
        include: User
    })
    const albumLists = await AlbumList.findAll({
        where: {
            shelfId: id
        }
    })
    albumLists.forEach(async list => {
        await list.destroy()
    })
    await shelf.destroy()
    const shelves = await Shelf.findAll()
    res.json({ shelves })
}));

router.patch('/update/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = req.params.id
    const shelf = await Shelf.findByPk(id, {
        include: User
    })
    shelf.name = req.body.name
    await shelf.save()
    res.json({ shelf: shelf.name })
}));

router.post('/own/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const { shelfId } = req.body
    const { userId } = req.session.auth
    await AlbumList.create({ shelfId: shelfId, albumId: id })
    const album = await Album.findByPk(id)
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
            ownerCount: 1
        })
        await createdAlbum.save()
        res.redirect(`/shelves/users/${userId}`)
    } else {
        album.ownerCount++
        album.save()
        res.redirect(`/shelves/users/${userId}`)
    }
}))

router.post('/remove/:id(\\d+)/:albumId(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const shelfId = req.params.id
    const albumId = req.params.albumId
    const albumList = await AlbumList.findOne({
        where: {
            shelfId, albumId
        }
    })
    const album = await Album.findByPk(albumId)
    album.ownerCount--
    album.save()
    await albumList.destroy()
    res.redirect(`/shelves/${shelfId}`)
}))

router.post('/listenedTo/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = req.params.id
    const albumList = await AlbumList.findByPk(id)
    const shelfId = albumList.shelfId
    albumList.listenedTo = true
    albumList.save()
    res.redirect(`/shelves/${shelfId}`)
}))

module.exports = router
