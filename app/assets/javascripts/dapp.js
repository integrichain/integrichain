App = {
  web3Provider: null,
  contracts: {},

  init: function() {
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
    $.getJSON('/contracts/HashStorage.json', function(data) { // initialize the HashStorage contract in JS
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var HashStorageArtifact = data;
      App.contracts.HashStorage = TruffleContract(HashStorageArtifact);

      // Set the provider for our contract
      App.contracts.HashStorage.setProvider(App.web3Provider);

      return
    });
  },

  storeHash: function(hash, onCompletion) {
    hashToSend = "0x"+hash;

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
        return hashStorageInstance.addHash(hashToSend) // store the hash in the HashStorage contract
      }).then(function(result) {
        console.log('result: ' + JSON.stringify(result));

        // The contract returns the index where the hash is stored by emitting a HashIndexReturned event.
        // The event can be accessed in the contract's logs
        // Here, we find the storage index in the logs
        for(i = 0; i < result.logs.length; i++) {
          if (result.logs[i].event == "HashIndexReturned") {
            var hashIndex = result.logs[i].args.index;
            onCompletion(hashIndex);
          }
        }
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  retrieveHash: function(hashIndex, onCompletion) {
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
        onCompletion(result[hashIndex]);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }
}

  $(window).on('load', function() {
    App.init();
  });
