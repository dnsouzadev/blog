const express = require('express')
const slugify = require('slugify')

const Article = require('./Article')

const Category = require('../categories/Category')

const router = express.Router()

router.get('/admin/articles', (req, res) => {
  res.send('rota de articles')
})

router.get('/admin/articles/new', (req, res) => {

  Category.findAll().then(categorias => {
    res.render('admin/articles/new', { categories: categorias })
  })
})

router.post('/articles/save', (req, res) => {
  let { title, body, category } = req.body

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect("/admin/articles")
  }).catch(() => {
    res.redirect("admin/articles/new")
  })
})

module.exports = router