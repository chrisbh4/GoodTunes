const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
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
    console.log("inside users id")
    const userId = parseInt(req.params.id, 10)
    const reviews = await Review.findAll({
        where: {
            userId
        },
        include: Album
    })
      console.log(reviews)
    // Grabs all of the logged in user's Shelves
    const shelves = await Shelf.findAll({ where: { userId } })
    res.render('shelves-detail', {
        shelves,
        userId,
        reviews,
        csrfToken: req.csrfToken()
    })
}))



router.post('/users/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10)
    const name = req.body.name
    await Shelf.create({
        name,
        userId
    });
    const shelves = await Shelf.findAll({ where: { userId } })
    res.json({ shelves })

}))

router.get('/:id(\\d+)', csrfProtection ,asyncHandler(async (req, res )=>{
    const id = req.params.id
    const shelf = await Shelf.findByPk(id)
    const albumList = await AlbumList.findAll({
        where:{
            shelfId: id
        },
        include: Album
    })

    res.render('shelf-detail', {
        shelf,
        albumList,
        csrfToken: req.csrfToken()
    })

}));

router.post('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res )=>{
    const id = req.params.id
    const shelf = await Shelf.findByPk(id,{
        include: User
    })
  await shelf.destroy()
    res.redirect(`/shelves/users/${shelf.User.id}`)
}));

router.post('/update/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
    const id = req.params.id
    const shelf = await Shelf.findByPk(id, {
        include: User
    })
    shelf.name = req.body.name
    await shelf.save()
    res.redirect(`/shelves/users/${shelf.User.id}`)
}))

router.post('/own/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
    const id = req.params.id
    const {shelfId} = req.body
    console.log(shelfId)
    await AlbumList.create({shelfId: shelfId, albumId: id})
    const album = await Album.findByPk(id)
    album.ownerCount++
    album.save()
    res.redirect('/albums/')
}))

router.post('/remove/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
    const id = req.params.id
    const albumList = await AlbumList.findByPk(id)
    const shelfId = albumList.shelfId
    const album = await Album.findByPk(albumList.albumId)
    album.ownerCount--
    album.save()
    await albumList.destroy()
    res.redirect(`/shelves/${shelfId}`)
}))

router.post('/listenedTo/:id(\\d+)', csrfProtection, asyncHandler(async(req, res)=>{
    const id = req.params.id
    const albumList = await AlbumList.findByPk(id)
    const shelfId = albumList.shelfId
    albumList.listenedTo = true
    albumList.save()
    res.redirect(`/shelves/${shelfId}`)
}))
module.exports = router
