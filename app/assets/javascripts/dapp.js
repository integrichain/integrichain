App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('/pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('/contracts/Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our  contract to retrieve and mark the adopted pets

      return App.markAdopted();
    });
    $.getJSON('/contracts/HashStorage.json', function(data) { // initialize the HashStorage contract in JS
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var HashStorageArtifact = data;
      App.contracts.HashStorage = TruffleContract(HashStorageArtifact);

      // Set the provider for our contract
      App.contracts.HashStorage.setProvider(App.web3Provider);
      App.storeHash("0x4918224b25f43bfa8651156fb47915a3544cc5bbdf59eb72e89bbc36");

      return
    });

    return App.bindEvents();
  },

  storeHash: function(hash) {
    var hash = parseInt(hash);

    var hashStorageInstance;

    // Grab any ethereum accounts associated with the current user
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
          console.log(error);
        }

      var account = accounts[0]; // use the first account

      App.contracts.HashStorage.deployed().then(function(instance) {
        hashStorageInstance = instance;

        // Execute adopt as a transaction by sending account
        // A transaction will burn gas
        // return adoptionInstance.adopt(petId, {from: account});
        return hashStorageInstance.addHash(hash)
      }).then(function(result) {
        console.log('result: ' + JSON.stringify(result));

        for(i = 0; i < result.logs.length; i++) {
          if (result.logs[i].event == "HashIndexReturned") {
            var hashIndex = result.logs[i].args.index.c[0];
            console.log('returned index: ' +hashIndex);
          }
        }

        // var retrievedHash = hashStorageInstance.getHashByIndex(result, { from: account })
        // console.log("retrievedHash: " + retrievedHash);
        return
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed()
      .then(function(instance) {
        adoptionInstance = instance;

        // grab adopters from the adoption contract. call does this without burning gas
        return adoptionInstance.getAdopters.call();
      })
      .then(function (adopters) {
        console.log(adopters)
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
            // disable adopt button and set the text to "Success"
            $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
          console.log(error);
        }

      var account = accounts[0];

      App.contracts.Adoption.deployed().then(function(instance) {
        adoptionInstance = instance;

        // Execute adopt as a transaction by sending account
        // A transaction will burn gas
        return adoptionInstance.adopt(petId, {from: account});
      }).then(function(result) { // result is a transaction object
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).on('load', function() {
    App.init();
  });
});
