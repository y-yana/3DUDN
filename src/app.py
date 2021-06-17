from flask import Flask, render_template, jsonify, request
import json
from chat import response
import os
app = Flask(__name__)

@app.route('/')
def index():
    #return "Hello World"
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def move_chat():
    return render_template("chat.html")

# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    res = response(request.form['chatMessage'])

    return_json = {
        "message": res
    }

    return jsonify(values=json.dumps(return_json))


@app.route('/upload', methods=['POST'])
def upload():
    the_file = request.files['the_file']
    the_file.save('./static/models/upload.vrm')
    return ""


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
    #app.run()
