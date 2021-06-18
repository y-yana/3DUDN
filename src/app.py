from flask import Flask, render_template, jsonify, request,session
import json
from chat import response
import os
app = Flask(__name__)

app.secret_key = 'secret'
#app.permanent_session_lifetime = timedelta(minutes=5)

@app.route('/')
def index():
    #return "Hello World"
    session['user_name'] = 'master'
    session['bot_name'] = 'bot'
    return render_template("index.html")


@app.route('/user_rename', methods=['POST'])
def user():
    session['user_name'] = request.form['user_name']
    return ""


@app.route('/bot_rename', methods=['POST'])
def bot():
    session['bot_name'] = request.form['bot_name']
    
    return ""


@app.route("/chat", methods=["POST"])
def move_chat():
    return render_template("chat.html")

# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    u_name=session['user_name']
    b_name=session['bot_name']
    res = response(request.form['chatMessage'],u_name,b_name)

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
