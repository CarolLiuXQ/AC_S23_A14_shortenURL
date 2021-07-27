function cleanOriginURL(URL) {
  //避免有輸入空白
  const originURL = URL.replace(/\s/g, '')
  //網域之後的要讓originURL的網域全部變成小寫 
  const thirdSlashIndex = originURL.split('/', 3).join('/').length
  const adminURL = originURL.slice(0, thirdSlashIndex)
  let adminLowerCaseURL = originURL.replace(adminURL, adminURL.toLowerCase())
  //如果沒有三個/的話，就讓adminLowerCaseURL補上第三個/，是為了統一格式
  if (/\/.*\/.*\//.test(originURL) !== true) {
    adminLowerCaseURL = adminLowerCaseURL.concat('/')
  }

  return adminLowerCaseURL

}


module.exports = cleanOriginURL