const Sequelize = require('sequelize' )

const connection = new Sequelize('blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: 'utf-3'
})

module.exports = connection