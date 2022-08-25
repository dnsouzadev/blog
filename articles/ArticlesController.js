const express = require('express')
const slugify = require('slugify')

const Article = require('./Article')
const Category = require('../categories/Category')

const router = express.Router()

router.get('/admin/articles', (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(artigos => {
    res.render('admin/articles/index', { articles: artigos, cate: artigos.category })
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

router.get('/admin/articles/edit/:id', (req, res) => {
  let { id } = req.params
  let int_id = parseInt(id)
  
  if (isNaN(id)) return res.redirect("/admin/edit")

  Article.findByPk(int_id, { include: [
    { model: Category }
  ]}).then(article => {
    Category.findAll().then(categories => {
      article !== undefined ? res.render('admin/articles/edit', { article, categories }) : res.redirect("/admin/articles")
    }).catch((err) => {
      res.redirect("/admin/articles")
    })
    })
})

router.post('/articles/update', (req, res) => {
  let { title, body, category, id } = req.body

  Article.update({ title, slug: slugify(title), body, categoryId: category }, {
    where: {
      id: id
    }
  }).then(() => {
    res.redirect("/admin/articles")
  }).catch(() => {
    res.redirect(`admin/articles/edit/${id}`)
  })
})

router.get('/articles/page/:num', (req, res) => {
  const { num } = req.params

  let offset = 0

  isNaN(num) || num === 1 ? offset = 0 : offset = (parseInt(num) - 1) * 4

  Article.findAndCountAll({
    limit: 4,
    offset,
    order: [
      ['id', 'DESC']
    ]
  }).then(articles => {

    let next
    offset + 4 >= articles.count ? next = false : next = true

    const result = {
      page: parseInt(num),
      next,
      articles
    }
    
    Category.findAll().then(categories => {
      res.render("admin/articles/page", { result, categories })
    })
  })


})

module.exports = router