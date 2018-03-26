// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function hashDocAndSend() {
  var fileInput = document.getElementById("fileInput")
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsDataURL(fileInput.files[0]);
}

function receivedText() {
  var hash = sha3_224(fr.result);
  App.storeHash(hash, function(index) {
    document.getElementById("doc-address").value = parseInt(index);
    document.getElementById("doc-form").submit();
  });
}

function verifyIntegrity(documentAddress, hashIndex) {
  var blob = null;
  var xhr = new XMLHttpRequest();  
  xhr.open("GET", documentAddress); 
  xhr.responseType = "blob";
  xhr.onload = function() {
    blob = xhr.response;
    var fr = new FileReader();
    fr.onload = function() {
      App.retrieveHash(hashIndex, function(hash) {
        var docHash = "0x" +sha3_224(fr.result);
        docHash = parseInt(docHash);
        if (docHash == hash) {
          alert("Document integrity confirmed");
        } else {
          alert("WARNING: Document invalid\n stored: " 
            +hash +"\ncalculated: "+docHash);
        }
      }); 
    }
  
    fr.readAsDataURL(blob); 
   }
    
   xhr.send();
}    
    
  
