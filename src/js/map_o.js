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

  $('#calcularPrecios').on('click', function() {
    $('.tabla').show();
  });

  $('#finalizar').on('click', function () {
    event.preventDefault();

    var idServicio = parseInt($(event.target).data('id'));

    var contratacionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Contratacion.deployed().then(function (instance) {
        contratacionInstance = instance;

        return contratacionInstance.contratar(idServicio, { from: account, value: 130681824455550001
        });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  });

  $('#rechazar').on('click', function () {
    event.preventDefault();

    var idServicio = parseInt($(event.target).data('id'));

    var contratacionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Contratacion.deployed().then(function (instance) {
        contratacionInstance = instance;

        return contratacionInstance.devolver(idServicio, { from: account, value: 130681824455550001
        });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  });

  $('#retraso').on('click', function() {
    event.preventDefault();

    var idServicio = parseInt($(event.target).data('id'));

    var contratacionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];

      App.contracts.Contratacion.deployed().then(function (instance) {
        contratacionInstance = instance;

        return contratacionInstance.contratar(idServicio, { from: account, value: 130681824455550001
        });
      }).then(function (result) {
        return App.markAdopted();
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  });
});