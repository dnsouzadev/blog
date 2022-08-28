const adminAuth = (req, res, next) => {
  if (req.session.user === undefined) return res.redirect('/login')

  next()
}

module.exports = adminAuth