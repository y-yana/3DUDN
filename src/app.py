from flask import Flask, render_template, jsonify, request,session
import json
from chat import response
import os
import datetime
import random, string
from negaposi.negaposi import negaposi
app = Flask(__name__)

app.secret_key = 'secret'
#app.permanent_session_lifetime = timedelta(minutes=5)

@app.route('/')
def index():
    #return "Hello World"

    session['user_name'] = 'master'
    session['bot_name'] = 'bot'
    return render_template("index.html")


@app.route('/rename', methods=['POST'])
def rename():
    session['user_name'] = request.form['user_name']
    session['bot_name'] = request.form['bot_name']

    print(session['user_name'])
    print(session['bot_name'])

    #return render_template("chat.html")
    return ""


# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    u_name=session['user_name']
    b_name=session['bot_name']
    res = response(request.form['chatMessage'],u_name,b_name)

    npi=negaposi(request.form['chatMessage'])
    npo=negaposi(res)

    print(npi)
    print(npo)
    NP=npi+npo

    return_json = {
        "message": res
        "NP": NP
    }

    return jsonify(values=json.dumps(return_json))


@app.route('/upload', methods=['POST'])
def upload():
    the_file = request.files['the_file']

    model_dir='./static/models/'
    model_files = os.listdir(model_dir)
    model_files.sort()
    print(model_files)
    if len(model_files)>=7:
        os.remove(model_dir+model_files[0])
    
    now = datetime.datetime.now()
    file_name = '{0:%d%H%M%S}'.format(now)
    
    path=f'./static/models/{file_name}.vrm'
    the_file.save(path)


    return_json = {
        "path": path
    }

    return jsonify(values=json.dumps(return_json))


if __name__ == '__main__':
    #port = int(os.environ.get("PORT", 5000))
    #app.run(host="0.0.0.0", port=port)
    app.run()
