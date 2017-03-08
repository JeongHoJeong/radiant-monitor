const Util = {}

Util.makePadding = function (string, length) {
  if (string.length < length) {
    return '0'.repeat(length - string.length) + string
  }

  return string
}

Util.dateFormat = function (date) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  let yyyy = date.getFullYear().toString()
  let mm = Util.makePadding((date.getMonth() + 1).toString(), 2)
  let dd = Util.makePadding(date.getDate().toString(), 2)

  let HH = Util.makePadding(date.getHours().toString(), 2)
  let MM = Util.makePadding(date.getMinutes().toString(), 2)
  let SS = Util.makePadding(date.getSeconds().toString(), 2)

  return `${yyyy}/${mm}/${dd} ${HH}:${MM}:${SS}`
}

Util.xhrGet = function (url, options, callback) {
  url += '?' + Object.keys(options).map((key) => {
    return `${key}=${options[key]}`
  }).join('&')

  const req = new XMLHttpRequest()

  req.open('GET', url, true)

  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      if (req.status == 200) {
        callback(null, JSON.parse(req.responseText))
      } else {
        callback(req.responseText, null)
      }
    }
  }

  req.send(null)
}

export default Util