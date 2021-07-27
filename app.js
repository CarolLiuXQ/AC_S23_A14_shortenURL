const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const routes = require('./routes/index')

require('./config/mongoose')

app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(routes)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})