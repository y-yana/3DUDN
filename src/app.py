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
    res = response(request.form['chatMessage'])

    return_json = {
        "message": res
    }

    return jsonify(values=json.dumps(return_json))

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'ファイル未指定'

    # fileの取得（FileStorage型で取れる）
    # https://tedboy.github.io/flask/generated/generated/werkzeug.FileStorage.html
    fs = request.files['file']

    # 下記のような情報がFileStorageからは取れる
    app.logger.info('file_name={}'.format(fs.filename))
    app.logger.info('content_type={} content_length={}, mimetype={}, mimetype_params={}'.format(
        fs.content_type, fs.content_length, fs.mimetype, fs.mimetype_params))


    # ファイルを保存
    fs.save('./static/models/upload.vrm')

    return render_template("index.html")

if __name__ == '__main__':
  app.run()
