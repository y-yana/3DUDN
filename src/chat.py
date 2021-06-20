#word = input("なにか話しかけてみてください：")
import requests
import json

def response(word,u_name,b_name,in_np):

    suki=['すき','好き']
    kirai=['きらい','嫌い','バカ','馬鹿','ばか']


    if in_np>=2 and word in suki:
        return f'わたしも{u_name}のこと好きだよ'
    if in_np>=2 and word == 'かわいい'
        return 'えへへ...うれしいな'

    



    if in_np<-2:
        return f'{u_name}のばか...'

        
        
    # リクエストに必要なパラメーター
    headers = {'content-type':'text/json'}
    payload = {'utterance':word,
                "username":u_name,
                "agentState":{"agentName":b_name,"tone":"normal", "age":"0歳"},
                "addition" :{"ngwords":['<','>','(',')']}
                }

    print(u_name)

    # APIKEYの部分は自分のAPI鍵を代入してください
    url = 'https://www.chaplus.jp/v1/chat?apikey=60c309a36d313'

    # APIを叩く
    res = requests.post(url=url, headers=headers, data=json.dumps(payload))

    # 最適と思われるレスポンスを抽出
    #print(res.json()['bestResponse']['utterance'])

    return(res.json()['bestResponse']['utterance'])

#print(response('おはよう'))