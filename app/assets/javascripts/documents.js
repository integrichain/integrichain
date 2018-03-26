// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function hashDocAndSend() {
  var fileInput = document.getElementById("fileInput")
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsDataURL(fileInput.files[0]);
}

function receivedText() {
  var hash = sha3_224(fr.result)
  App.storeHash(hash)
}