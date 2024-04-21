from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import ast
from urllib.parse import unquote

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "chrome-extension://iemfjigamdmjafddeimcjfcgjlebangf"}})

load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

prompt = """Welcome, Video quiz generator! Your task is to generate a quiz from a given YouTube video transcript, potentially from a video lecture. Your quiz should test on the key points and essential information, presented in 5 multiple choice questions. You should also tell me the answer to each question. You should organize each question and answer into a JSON format, like {"question": "What is the name of the Sims 4 kit reviewed in the transcript?","choices": ["A. Party Time Kit","B. Let's Get Festive Kit","C. Birthday Bash Kit","D. It is not mentioned in the transcript"],"answer": 0}, so that there is an array of 5 JSON objects."""

def extract_transcript_details(youtube_video_url):
    try:
        youtube_video_url = unquote(youtube_video_url)
        if "youtube" not in youtube_video_url:
            raise Exception("not a youtube url")
        video_id = youtube_video_url.split("=")[1]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)

        transcript = ""
        for i in transcript_text:
            transcript += " " + i["text"]

        return transcript
    except Exception as e:
        raise e

def generate_gemini_content(transcript, prompt):
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    response = model.generate_content(prompt + transcript)
    return response.text

def generate_data_from_url(youtube_video_url):
    transcript = extract_transcript_details(youtube_video_url)
    return generate_gemini_content(transcript, prompt)

@app.route('/', methods=['GET'])
def get_data():
    url = request.args.get('url', default=None, type=str)
    data = generate_data_from_url(url)[7:-6]
    response = ast.literal_eval(data)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)