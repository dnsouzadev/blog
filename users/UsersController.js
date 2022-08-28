const express = require('express')
const bcrypt = require('bcryptjs')

const adminAuth = require('../middlewares/adminAuth')

const User = require('./User')

const router = express.Router()

router.get('/admin/users', adminAuth, (req, res) => {
  User.findAll().then(users => {
    res.render('admin/users/index', { users })
  })
})

router.get('/admin/create', adminAuth, (req, res) => {
  res.render('admin/users/create')
})

router.post('/users/create', adminAuth, (req, res) => {
  const { email, password } = req.body

  User.findOne({ where: {
    email
  }}).then(user => {
    if (user === null) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      User.create({
        email,
        password: hash
      }).then(() => {
        res.redirect('/admin/users')

      }).catch(() => {
        res.redirect('/admin/create')
      })

    } else {
      res.redirect('/admin/create')
    }
  })
})

router.get('/login', (req, res) => {
  res.render('admin/users/login')
})

router.post('/authenticate', (req, res) => {
  const { email, password } = req.body
  
  User.findOne({ where: { email }}).then(user => {
    if (user === null) return res.redirect('/login')

    console.log(user)
    const correct = bcrypt.compareSync(password, user.password)

    if (!correct) return res.redirect('/login')

    req.session.user = {
      id: user.id,
      email: user.email
    }

    res.redirect('admin/articles')

  })
  
})

module.exports = router