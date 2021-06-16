window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = '';

document.getElementById('recStart_').onclick = function recStart() {
  recognition.start();
}
document.getElementById('recStop_').onclick = function recStop() {
  recognition.stop();
}

recognition.onresult = function (event) {
  let interimTranscript = '';
  finalTranscript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      transcript += "。\n";
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  document.getElementById("chatMessage").value = finalTranscript + interimTranscript;
}
