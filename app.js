const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const URL = require('./models/URL')

require('./config/mongoose')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})