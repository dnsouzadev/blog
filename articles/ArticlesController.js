const express = require('express')
const slugify = require('slugify')

const Article = require('./Article')
const Category = require('../categories/Category')

const router = express.Router()

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(artigos => {
    res.render('admin/articles/index', { articles: artigos })
  })

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

router.post('/articles/delete', (req, res) => {
  let { id } = req.body
  let int_id = parseInt(id)

  !isNaN(id) ? Article.destroy({
    where: {
      id: int_id
    }
  }).then(() => {
    res.redirect('/admin/articles')
  }) : res.redirect('/admin/articles')

})

module.exports = router