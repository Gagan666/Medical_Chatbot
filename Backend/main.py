from flask import Flask, request
from flask_cors import CORS
import google.generativeai as genai
import json
# from google.generativeai
app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})
class GEM_AI:
    def __init__(self):
        genai.configure(api_key="AIzaSyBHDGzILfjTAx5AWsJmpbFrscmlS3KXWHc")
        safety_settings = {
                "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
                "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
                "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
                "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
            }
        generation_config = {
                "temperature": 0.7,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 2048,
            }

        self.model = genai.GenerativeModel('gemini-pro', generation_config=generation_config, safety_settings=safety_settings)
        # chat = model.start_chat(history=[
        #
        # ])

@app.route('/chat',methods=["POST"])
def ProcessChats():
    data = request.get_json()
    print(data)
    # data=(json.loads(data))
    print(data['body'])
    ob = GEM_AI()
    response = ob.model.generate_content(data['body'])
    print(response.text)
    return {"response":response.text}

if __name__ == '__main__':
    app.run(debug=True)

