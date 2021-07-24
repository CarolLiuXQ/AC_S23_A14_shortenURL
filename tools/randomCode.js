function randomCode() {
  let characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const numberLength = 5
  let randomCode = ''

  for (let i = 0; i < numberLength; i++) {
    const randomIndex = Math.floor(Math.random() * (62 - i))
    randomCharacter = characters.splice(randomIndex, 1)
    randomCode += randomCharacter
  }
  return randomCode

}


module.exports = randomCode