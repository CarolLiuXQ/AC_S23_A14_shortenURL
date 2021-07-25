const copyButton = document.querySelector('#copyButton')

function copyURL() {
  const target = document.querySelector('#shortenURL')
  let range, select;
  if (document.createRange) {
    range = document.createRange();
    range.selectNode(target)
    select = window.getSelection();
    select.removeAllRanges();
    select.addRange(range);
    document.execCommand('copy');
    select.removeAllRanges();
  } else {
    range = document.body.createTextRange();
    range.moveToElementText(target);
    range.select();
    document.execCommand('copy');
  }
  copyButton.className = 'btn btn-primary mb-3'
  copyButton.innerHTML = 'Copied!'
}

copyButton.addEventListener('click', copyURL)