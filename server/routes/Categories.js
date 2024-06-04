const express = require('express')
const router = express.Router()
const  { Categories } = require('../models')

router.get("/", async (req, res) => {
    const listofCategories = await Categories.findAll()   
    res.json(listofCategories)
})

router.post("/", async (req, res) => {
    const post = req.body
    await Categories.create(post)
    res.json(post)
})

module.exports = router