from youtube_transcript_api import YouTubeTranscriptApi
import google.generativeai as genai
import os
from dotenv import load_dotenv
import streamlit as st

load_dotenv()

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

prompt = """Welcome, Video quiz generator! Your task is to generate a quiz from a given YouTube video transcript, potentially from a video lecture. Your quiz should test on the key points and essential information, presented in 5 multiple choice questions. Let's dive into the provided transcript and generate quiz for our audience."""

def extract_transcript_details(youtube_video_url):
    try:
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

st.title(
    "Gemini YouTube Quiz Generator: Generate Quiz from YouTube Videos"
)
youtube_link = st.text_input("Enter YouTube Video Link:")

if youtube_link:
    video_id = youtube_link.split("=")[1]
    st.image(f"http://img.youtube.com/vi/{video_id}/0.jpg", use_column_width=True)

# Button to trigger summary generation
if st.button("Generate Quiz"):
    transcript = extract_transcript_details(youtube_link)

    if transcript:
        # Generate summary using Gemini Pro
        quiz = generate_gemini_content(transcript, prompt)

        # Display summary
        st.markdown("## Quiz:")
        st.write(quiz)