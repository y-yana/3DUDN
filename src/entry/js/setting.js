document.getElementById('setting').onclick = function () {
  var renameForm = document.getElementById('renameArea');
  var modelUpForm = document.getElementById('modelChangeArea');

  var renameStyle = renameForm.style.display;
  var modelUpStyle = modelUpForm.style.display;

  console.log(renameForm)
  console.log(renameStyle)
  if (renameStyle == 'none' || modelUpStyle == 'none') {
    renameForm.style.display = 'block';
    modelUpForm.style.display = 'block';
  }
}
