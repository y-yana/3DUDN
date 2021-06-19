document.getElementById("chatSubmitForm").onkeydown = function(event){
  if (event.key === 'Enter') {
      event.preventDefault();
    }
}
