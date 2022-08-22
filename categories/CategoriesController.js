const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new.ejs')
})

router.post('/categories/save', (req, res) => {
  let { title } = req.body

  title.length !== 0 ? Category.create({
    title: title,
    slug: slugify(title)
  }).then(() => {
    res.redirect('/admin/categories')
  }) : res.redirect('/admin/categories/new')
})

router.get('/admin/categories', (req, res) => {

  Category.findAll().then(cat => {
    res.render('admin/categories/index.ejs', { categories: cat})
  })
})

module.exports = router