// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", () => {
  // Fetch current tab URL and extract video ID
  var questionContainer = document.getElementById('questions');
  var questionTemplate = document.getElementById('question-template');

  // hardcoded data
  var data = [
    {
      "question": "What is the name of the Sims 4 kit reviewed in the transcript?",
      "answers": [
        "A. Party Time Kit",
        "B. Let's Get Festive Kit",
        "C. Birthday Bash Kit",
        "D. It is not mentioned in the transcript"
      ],
      "correct_answer": 0
    },
    {
      "question": "Does the reviewer recommend this kit?",
      "answers": [
        "A. Yes, especially for console players.",
        "B. Yes, it is a great value.",
        "C. No, she thinks it is overpriced and lacking in features.",
        "D. No, but she recommends similar free custom content for PC players."
      ],
      "correct_answer": 2
    }]

  function createQuestionElement(datum){
    var clone = questionTemplate.content.cloneNode(true);
    var questionElement = clone.querySelector('.question');
    var questionTextElement = clone.querySelector('.question-text');
    questionTextElement.textContent = datum.question;
    return questionElement;
  }

  
  
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;
    let videoId = getVideoId(url);
    if (videoId){
      // chrome.tabs.sendMessage(tabs[0].id, { url: videoId, action: 'quiz' });
      // TODO: use videoId to get transcript then generate formated quiz
      data.forEach(datum => {
        questionContainer.appendChild(createQuestionElement(datum));
      });
    }
    
  });

});



function getVideoId(url){
  let videoId = new URLSearchParams(url.split("?")[1]).get("v");
  return videoId;
}
