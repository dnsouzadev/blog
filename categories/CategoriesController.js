const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new.ejs')
})

router.post('/categories/save', (req, res) => {
  let { title } = req.body
  console.log(title)
  console.log(title.length)
  console.log(typeof(title))

  title.length !== 0 ? Category.create({
    title: title,
    slug: slugify(title)
  }).then(() => {
    res.redirect('/')
  }) : res.redirect('/admin/categories/new')
})

module.exports = router