# YouTutor
Project for LA Hacks 2024.
[Devpost](https://devpost.com/software/yoututors)

## Description
Have you ever taught yourself with online video lectures? Transform your learning experience with **_YouTutor_**! With this Google Chrome extension, you can study any Youtube video as if there is a class tutor by your side. Thanks to the power of Google's Gemini Pro GenerativeAI, YouTutor can create engaging quizzes tailored to the content you're watching. Explore interactive learning with a simple click!

Target users: Students, Professors, Anyone in education

## Features
- Extracts transcripts from YouTube videos.
- Generate quizzes using Google's Gemini Pro GenerativeAI.
- Google Chrome Extension making it easy to use.
- Compare your answers to the solution.

## Instruction
1. Clone this repository to your local machine.
2. Install the required Python dependencies listed in `requirements.txt` using `pip install -r requirements.txt`.
3. Set up your Google API key by creating a `.env` file in the root directory of this repository and adding your key: `GOOGLE_API_KEY=[your_api_key]`
4. Run `python app.py` in your terminal.
5. Upload the Chrome Extension locally by clicking "Manage Extensions" and "Load unpacked". Select the root directory of this repository.
6. Open any Youtube Video and click on the extension you just loaded. Wait for a few seconds and you get the quiz!

## Demo Usage Video
[![video](http://img.youtube.com/vi/nBlDoAOwgBE/maxresdefault.jpg)](https://youtu.be/nBlDoAOwgBE)


### Dependencies
`youtube_transcript_api`
`google.generativeai`
`python-dotenv`
`Flask`
`flask-cors`

### TODO:
1. UI:
   - Pin the Chrome extension window
   - Prettier UI
   - More types of questions: T/F, multiple-answers, fill in blanks
   - Integrate Math symbols (latex), audios into questions
2. Scalability:
   - Use of timestamp to be more interactive (pop-up quiz, jump to topic)
   - More features such as summarize video, solution analysis
   - More platforms and more formats of info such as articles, arxiv papers
   - No local backend server needed, or no Python needed
   - Visual-heavy or music-heavy videos such as bird recognition
   - Allow user-uploaded datasets such as actual course materials and quizzes. Use RAG to have more accurate answers.
