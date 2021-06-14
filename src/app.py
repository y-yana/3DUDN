from flask import Flask, render_template, jsonify, request
import json
from chat import response
app = Flask(__name__)


@app.route('/')
def index():
    #return "Hello World"
    return render_template("index.html")

# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    res=response(request.form['username'])

    return_json = {
        "message": res
    }

    return jsonify(values=json.dumps(return_json))

if __name__ == '__main__':
  app.run()
