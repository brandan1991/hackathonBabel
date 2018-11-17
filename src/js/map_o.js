var originCoordinates;
var destinationCoordinates;
var map;
$(document).ready(function() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam1hcnRpbmZlIiwiYSI6ImNqb2tza290OTBhZzgzdm55M3J2dWlpb2gifQ.mLVONrpnkhUb-1uYYHf6kQ';
    map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: [-3.6912234,40.4084913], // starting position [lng, lat]
      zoom: 15 // starting zoom
  });
  
  map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }), 'top-left');
});