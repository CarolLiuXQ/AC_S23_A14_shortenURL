const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3000

const URL = require('../../models/URL')
const admin = `http://localhost:${PORT}/`
const randomCode = require('../../tools/randomCode')

//根目錄
router.get('/', (req, res) => {
  res.render('index')
})


//post根目錄
router.post('/', (req, res) => {
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


//get短縮網址
router.get('/:randomCode', (req, res) => {
  const randomCode = req.url.replace('/', '')
  URL.find({ shortenURL: randomCode })
    .lean()
    .then(result => res.redirect(result[0].originURL))
    .catch(error => console.log(error))
})


module.exports = router