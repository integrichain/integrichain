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

        // A transaction will burn gas
        return hashStorageInstance.addHash(hash) // store the hash in the HashStorage contract
      }).then(function(result) {
        console.log('result: ' + JSON.stringify(result));

        // The contract returns the index where the hash is stored by emitting a HashIndexReturned event.
        // The event can be accessed in the contract's logs
        // Here, we find the storage index in the logs
        for(i = 0; i < result.logs.length; i++) {
          if (result.logs[i].event == "HashIndexReturned") {
            var hashIndex = JSON.stringify(result.logs[i].args.index)
            console.log('returned index: ' + hashIndex);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  retrieveHash: function(hashIndex) {
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

        return hashStorageInstance.getHashes.call(); // grab all stored hashes from the contract
      }).then(function(result) {
        console.log('hashes retrieved: ' + result);
        var retrievedHash = JSON.stringify(result[hashIndex]) // grab the requested hash from the specified index
        console.log('hash at index ' + hashIndex + ': ' + retrievedHash)

        // send that shit to the server

        return result[hashIndex];
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
