document.getElementById('uploadBtn').onclick = function() {
  var parent = document.getElementById('modelChangeArea');
  var child = document.getElementById('uploadForm');
  parent.removeChild(child);

  var newElement = document.createElement("button");
  var newContent = document.createTextNode("Model Change");
  newElement.appendChild(newContent);
  newElement.setAttribute("id","modelChangeBtn");

  parent.appendChild(newElement);
}
