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
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

const admin = 'http://localhost/'
const randomCode = require('./tools/randomCode')

app.post('/', (req, res) => {
  //避免有輸入空白
  const originURL = req.body.URL.replace(/\s/g, '')
  //網域之後的要讓originURL的網域全部變成小寫 
  const thirdSlashIndex = originURL.split('/', 3).join('/').length
  const adminURL = originURL.slice(0, thirdSlashIndex)
  let adminLowerCaseURL = originURL.replace(adminURL, adminURL.toLowerCase())
  //如果沒有三個/的話，就讓adminLowerCaseURL補上第三個/，是為了統一格式
  if (/\/.*\/.*\//.test(originURL) !== true) {
    adminLowerCaseURL = adminLowerCaseURL.concat('/')
  }

  //////判斷網址有沒有重複
  URL.find({ originURL: adminLowerCaseURL })
    .lean()
    .then(url => {
      //輸入相同網址時，產生一樣的縮址
      if (url.length === 1) {
        res.render('index', { shortenURL: admin.concat(url[0].shortenURL) })
      }
      //因無相同網址，故產生一個新的
      else {
        const NewURL = new URL({
          originURL: originURL,
          shortenURL: randomCode()
        })
        NewURL.save()
          .then(() => res.render('index', { shortenURL: admin.concat(NewURL.shortenURL) }))
      }
    })
    .catch(error => console.log(error))
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})