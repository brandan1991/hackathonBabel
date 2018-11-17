var originCoordinates;
var destinationCoordinates;
var map;
$(document).ready(function() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam1hcnRpbmZlIiwiYSI6ImNqb2tza290OTBhZzgzdm55M3J2dWlpb2gifQ.mLVONrpnkhUb-1uYYHf6kQ';
    map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-3.70379, 40.416775], // starting position [lng, lat]
      zoom: 15 // starting zoom
  });

  $('#formRoute').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "https://eu1.locationiq.com/v1/search.php?key=ee1df7392b19a0&q=" + $('#origin').val() + "&format=json",
    }).done(function(data) {
      originCoordinates = [data[0].lat, data[0].lon]; 
      getDestinationCoordinates();
    });
  });
});

function getDestinationCoordinates() {
  $.ajax({
    url: "https://eu1.locationiq.com/v1/search.php?key=ee1df7392b19a0&q=" + $('#destination').val() + "&format=json",
  }).done(function(data) {
    destinationCoordinates = [data[0].lat, data[0].lon];
    drawMarkers();
  });
}
function drawMarkers() {
  $.ajax({
    url: "https://api.mapbox.com/directions/v5/mapbox/driving/"+ originCoordinates[0] + "," + originCoordinates[1] + ";" + destinationCoordinates[0] + "," + destinationCoordinates[1] + "?geometries=geojson&access_token=pk.eyJ1Ijoiam1hcnRpbmZlIiwiYSI6ImNqb2tza290OTBhZzgzdm55M3J2dWlpb2gifQ.mLVONrpnkhUb-1uYYHf6kQ",
  }).done(function(data) {
    console.log(data);
  });
  
  /*
  var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  mapboxClient.geocoding.forwardGeocode({
    query: originCoordinates,
    autocomplete: false,
    limit: 1
    })
    .send()
    .then(function (response) {
        if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];
    
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                center: feature.center,
                zoom: 10
            });
            new mapboxgl.Marker()
                .setLngLat(feature.center)
                .addTo(map);
        }
    });
    */
}
  