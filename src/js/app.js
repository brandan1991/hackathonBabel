App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no intected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Contratacion.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ContratacionArtifact = data;
      App.contracts.Contratacion = TruffleContract(ContratacionArtifact);

      // Set the provider for our contract
      App.contracts.Contratacion.setProvider(App.web3Provider);

      // User our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  obtenerValorMoneda: function (importer) {
    return importe * 10000000000000;
  },

  bindEvents: function () {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function (adopters, account) {
    var contratacionInstance;

    App.contracts.Contratacion.deployed().then(function (instance) {
      contratacionInstance = instance;

      return contratacionInstance.getAdopters.call();
    }).then(function (adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });
  },

  handleAdopt: function (event) {
    event.preventDefault();

    var idServicio = parseInt($(event.target).data('id'));

    var contratacionInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
      $('.desaparece').hide();
      $('.btnFin').show();
      $('#calcularPrecios').hide();
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
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});