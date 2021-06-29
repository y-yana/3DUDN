document.getElementById('setting').onclick = function () {
  var renameForm = document.getElementById('renameArea');
  var modelUpForm = document.getElementById('modelChangeArea');
  var muteBtn = document.getElementById('muteBtn');

  var renameStyle = renameForm.style.display;
  var modelUpStyle = modelUpForm.style.display;
  var muteBtnStyle = muteBtn.style.display;

  if (renameStyle == 'none' || modelUpStyle == 'none' || muteBtnStyle == 'none') {
    renameForm.style.display = 'block';
    modelUpForm.style.display = 'block';
    muteBtn.style.display = 'block';
  } else {
    renameForm.style.display = 'none';
    modelUpForm.style.display = 'none';
    muteBtn.style.display = 'none';
  }
}
