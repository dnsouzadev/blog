const express = require('express')
const router = express.Router()
const Category = require('../categories/Category')

router.get('/articles', (req, res) => {
  res.send('rota de articles')
})

router.get('/admin/articles/new', (req, res) => {

  Category.findAll().then(categorias => {
    res.render('admin/articles/new', { categories: categorias })
  })
})

module.exports = router