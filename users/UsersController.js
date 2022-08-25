const express = require('express')
const bcrypt = require('bcryptjs')

const User = require('./User')

const router = express.Router()

router.get('/admin/users', (req, res) => {
  res.send("listar users")
})

router.get('/admin/create', (req, res) => {
  res.render('admin/users/create')
})

router.post('/users/create', (req, res) => {
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
        res.redirect('/')

      }).catch(() => {
        res.redirect('/admin/create')
      })

    } else {
      res.redirect('/admin/create')
    }
  })
})

module.exports = router