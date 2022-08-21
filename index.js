const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// view engine
app.set('view engine', 'ejs')

// static
app.use(express.static('public'))

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(8080, () => {
  console.log('is running')
})