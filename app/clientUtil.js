Util = {
  makePadding(string, length) {
    if (string.length < length) {
      return '0'.repeat(length - string.length) + string;
    }

    return string;
  },

  dateFormat(date) {
    let yyyy = date.getFullYear().toString();
    let mm = Util.makePadding((date.getMonth() + 1).toString(), 2);
    let dd = Util.makePadding(date.getDate().toString(), 2);

    let HH = Util.makePadding(date.getHours().toString(), 2);
    let MM = Util.makePadding(date.getMinutes().toString(), 2);
    let SS = Util.makePadding(date.getSeconds().toString(), 2);

    return `${yyyy}/${mm}/${dd} ${HH}:${MM}:${SS}`;
  }
};

/*var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}*/
