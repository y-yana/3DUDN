from flask import Flask, render_template, jsonify, request
import json
app = Flask(__name__)


@app.route('/')
def index():
    #return "Hello World"
    return render_template("index.html")

# /showにPOSTリクエストが送られたら処理してJSONを返す
@app.route('/show', methods=['POST'])
def show():
    return_json = {
        "message": f"Hello, {request.form['username']}"
    }
    return jsonify(values=json.dumps(return_json))

if __name__ == '__main__':
  app.run()
