const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')

const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categories/new', adminAuth, (req, res) => {
  res.render('admin/categories/new.ejs')
})

router.post('/categories/save', adminAuth, (req, res) => {
  let { title } = req.body

  title.length !== 0 ? Category.create({
    title: title,
    slug: slugify(title)
  }).then(() => {
    res.redirect('/admin/categories')
  }) : res.redirect('/admin/categories/new')
})

router.get('/admin/categories', adminAuth, (req, res) => {

  Category.findAll().then(cat => {
    res.render('admin/categories/index.ejs', { categories: cat})
  })
})

router.post('/categories/delete', adminAuth, (req, res) => {
  let { id } = req.body
  let int_id = parseInt(id)

  !isNaN(id) ? Category.destroy({  
    where: {
      id: int_id
  }}).then(() => {
    res.redirect('/admin/categories')
  }) : res.redirect('/admin/categories')

})

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
  let { id } = req.params
  let int_id = parseInt(id)
  
  if (isNaN(id)) return res.redirect("/admin/categories")

  Category.findByPk(int_id).then(category => {
    category !== undefined ? res.render('admin/categories/edit', { category: category }) : res.redirect("/admin/categories")
  }).catch((err) => {
    res.redirect("/admin/categories")
  })
})

router.post('/categories/update', adminAuth, (req, res) => {
  let { title, id } = req.body

  Category.update({ title: title, slug: slugify(title) }, { where: {
    id: id
  }}).then(() => {
    res.redirect("/admin/categories")
  })
})

module.exports = router