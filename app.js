const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const URL = require('./models/URL')

require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})



app.post('/', (req, res) => {
  const originURL = req.body.URL
  const url = new URL({
    originURL: originURL,
    shortenURL: 'test'
  })
  return url.save()
    .then(() => res.render('index', { originURL }))
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})