# SmartStream Tutor
Project for LA Hacks 2024.
[Devpost]()

## Description
Have you ever taught yourself with online video lectures? Transform your learning experience with **_SmartStream Tutor_**! With this Google Chrome extension, you can study any Youtube video as if there is a class tutor by your side. Thanks to the power of Google's Gemini Pro GenerativeAI, SmartStream Tutor can create engaging quizzes tailored to the content you're watching. Explore interactive learning with a simple click!

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

## Screenshot
<img src="https://github.com/Zeitgeisttt/SmartStream-Tutor/assets/42275000/d9e5e985-0441-45b9-a179-6e3588117be8" width="300">


### Dependencies
`youtube_transcript_api`
`google.generativeai`
`python-dotenv`
`Flask`
`flask-cors`

### TODO:
1. Pin the Chrome extension window
2. Make use of timestamp (jump to the topic of question)
3. More features such as summarize video, solution analysis
4. More aesthetic UI
5. No local server needed. Or no Python needed.
