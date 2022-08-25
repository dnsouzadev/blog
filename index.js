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
    ],
    limit: 4
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render('index', { articles, categories })
    })
  })
})

app.get('/:slug', (req, res) => {
  let { slug } = req.params

  Article.findOne({
    where: {
      slug
    }
  }).then((article) => {
    article !== undefined ? Category.findAll().then(categories => {
      res.render('article', { article, categories })
    }) : res.redirect("/")
  }).catch(() => {
    res.redirect("/")
  })
})

app.get('/category/:slug', (req, res) => {
  let { slug } = req.params

  Category.findOne({
    where: {
      slug
    },
    include: [
      { model: Article }
    ]
  }).then((category) => {
    category !== undefined ? Category.findAll().then((categories) => {
      res.render('index', { articles: category.articles, categories })
    }) : res.redirect('/')
  }).catch(() => {
    res.redirect('/')
  })

})

app.listen(8000, () => {
  console.log('is running')
})