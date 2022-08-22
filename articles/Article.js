const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

Category.hasMany(Article) // category tem muitos article = 1 PARA MUITOS
Article.belongsTo(Category) // article tem uma category = 1 PARA 1

module.exports = Article