from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
app = Flask(__name__)

load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

prompt = """Welcome, Video quiz generator! Your task is to generate a quiz from a given YouTube video transcript, potentially from a video lecture. Your quiz should test on the key points and essential information, presented in 5 multiple choice questions. Let's dive into the provided transcript and generate quiz for our audience."""

def extract_transcript_details(youtube_video_url):
    try:
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

def test_gen(youtube_video_url):
    return "Hello"


@app.route('/', methods=['GET'])
def get_data():
    url = request.args.get('url', default=None, type=str)
    data = test_gen(url)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)