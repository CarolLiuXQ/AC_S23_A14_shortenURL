const URL = require('../URL')
const db = require('../../config/mongoose.js')

db.once('open', () => {
  URL.create({
    originURL: 'https://www.GOOGLE.co.jp/',
    shortenURL:'"9pekN"'
  })
console.log('done!')
})