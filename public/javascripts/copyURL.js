const copyButton = document.querySelector('#copyButton')

function copyURL() {
  const shortenURL = document.querySelector('#shortenURL')
  let range, select;
  if (document.createRange) {
    range = document.createRange();
    range.selectNode(shortenURL)
    select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
    document.execCommand('copy');
    select.removeAllRanges();
  } else {
    range = document.body.createTextRange();
    range.moveToElementText(shortenURL);
    range.select();
    document.execCommand('copy');
  }
  copyButton.className = 'btn btn-primary mb-3 col-3'
  copyButton.innerHTML = 'Copied!'
}

copyButton !== null ? copyButton.addEventListener('click', copyURL) : null