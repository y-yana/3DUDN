window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();
recognition.lang = 'ja';
recognition.continuous = true;
recognition.interimResults = true;

let finalTranscript = '';

$(document).on('click','#recStart_',function() {
  // 録音開始ボタンの削除
  var recStartBtn = document.getElementById('recStart_');
  recStartBtn.remove();

  // 録音終了ボタンを追加
  var parent = document.getElementById('chatSubmitForm');
  var input = document.getElementById('chatMessage');
  var newElement = document.createElement("button");
  var newContent = document.createTextNode("録音終了");
  newElement.appendChild(newContent);
  newElement.setAttribute("id", "recStop_");
  newElement.setAttribute("class", "recordBtn");
  parent.insertBefore(newElement, input.nextElementSibling);

  // 送信ボタンの無効化
  $("#chatSubmitBtn").prop("disabled", true);

  // 録音開始
  recognition.start();
})

$(document).on('click','#recStop_',function() {
  // 録音終了ボタンの削除
  var recStopBtn = document.getElementById('recStop_');
  recStopBtn.remove();

  // 録音開始ボタンを追加
  var parent = document.getElementById('chatSubmitForm');
  var input = document.getElementById('chatMessage');
  var newElement = document.createElement("button");
  var newContent = document.createTextNode("録音開始");
  newElement.appendChild(newContent);
  newElement.setAttribute("id", "recStart_");
  newElement.setAttribute("class", "recordBtn");
  parent.insertBefore(newElement, input.nextElementSibling);

  // 送信ボタンの有効化
  $("#chatSubmitBtn").prop("disabled", false);

  // 録音終了
  recognition.stop();
})

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
