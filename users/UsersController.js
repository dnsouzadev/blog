const express = require('express')
const User = require('./User')

const router = express.Router()

router.get('/admin/users', (req, res) => {
  res.send("listar users")
})

router.get('/admin/create', (req, res) => {
  res.render('admin/users/create')
})


module.exports = router