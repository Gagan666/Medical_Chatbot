import os

from flask import Flask, request
from flask_cors import CORS
import google.generativeai as genai
import json
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

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
                "temperature": 0.6,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 2048,
            }

        self.model = genai.GenerativeModel('gemini-pro', generation_config=generation_config, safety_settings=safety_settings)

@app.route('/chat',methods=["POST"])
def ProcessChats():

    data = request.get_json()
    print(data)
    inp = (data['body'])
    print(inp)

    response = conversation.predict(input=inp)
    return {"response":response}

if __name__ == '__main__':
    os.environ["GOOGLE_API_KEY"] = "AIzaSyBHDGzILfjTAx5AWsJmpbFrscmlS3KXWHc"
    gemini_llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    PROMPT_TEMPLATE = """The following is a professional conversation between AI that is a medical advisor assistant and human. The AI is knowledgable and provides lots of specific details from its context. If the AI is not sure about the answer to a question, it truthfully says dont know and seek professional help.Try to provide the response in markdown format.

    Current conversation:
    {history}
    Human: {input}
    Medical AI Assistant:
    """

    PROMPT = PromptTemplate(
        input_variables=["history", "input"], template=PROMPT_TEMPLATE
    )
    conversation = ConversationChain(
        llm=gemini_llm,
        prompt=PROMPT,
        verbose=False,
        memory=ConversationBufferMemory(ai_prefix="Medical Ai")
    )
    app.run(debug=True)

