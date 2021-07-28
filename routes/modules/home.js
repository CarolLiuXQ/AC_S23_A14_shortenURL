const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

const URL = require('../../models/URL')
const admin = process.env.ROOT_URL || `http://localhost:${PORT}/`
const randomCode = require('../../tools/randomCode')
const cleanOriginURL = require('../../tools/cleanOriginURL')

/////////根目錄
router.get('/', (req, res) => {
  res.render('index')
})


//////////post根目錄
router.post('/', (req, res) => {
  //整理輸入網址
  const adminLowerCaseURL = cleanOriginURL(req.body.URL)

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
          originURL: adminLowerCaseURL,
          shortenURL: randomCode()
        })
        NewURL.save()
          .then(() => res.render('index', { shortenURL: admin.concat(NewURL.shortenURL) }))
      }
    })
    .catch(error => console.log(error))
})


/////////////get短縮網址
router.get('/:randomCode', (req, res) => {
  const randomCode = req.params.randomCode.replace('/', '')
  URL.find({ shortenURL: randomCode })
    .lean()
    .then(result => res.redirect(result[0].originURL))
    .catch(error => console.log(error))
})


module.exports = router