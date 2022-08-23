const express = require('express')
const bodyParser = require('body-parser')

const connection = require('./database/database')
const app = express()

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

// view engine
app.set('view engine', 'ejs')

// static
app.use(express.static('public'))

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database
connection.authenticate().then(() => {
  console.log('DB is connected')
}).catch((error) => {
  console.log(error)
})

// routes
app.use("/", categoriesController)
app.use("/", articlesController)

app.get('/', (req, res) => {

  Article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(articles => {
    res.render('index', { articles })
  })
})

app.get('/:slug', (req, res) => {
  let { slug } = req.params
  Article.findOne({
    where: {
      slug
    }
  }).then((article) => {
    article !== undefined ? res.render("article", { article }) : res.redirect("/")
  }).catch((err) => {
    res.redirect("/")
  })
})

app.listen(8000, () => {
  console.log('is running')
})