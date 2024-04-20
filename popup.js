// adding a new bookmark row to the popup
const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};






document.addEventListener("DOMContentLoaded", () => {
  

  // Fetch current tab URL and extract video ID
  // document.documentElement.requestFullscreen();
  var questionList = document.getElementById('questions');
  var questionTemplate = document.getElementById('question-template');

  // hardcoded data
  // var data = [
  //   {
  //     "question": "What is the name of the Sims 4 kit reviewed in the transcript?",
  //     "choices": [
  //       "A. Party Time Kit",
  //       "B. Let's Get Festive Kit",
  //       "C. Birthday Bash Kit",
  //       "D. It is not mentioned in the transcript"
  //     ],
  //     "answer": 0
  //   },
  //   {
  //     "question": "Does the reviewer recommend this kit?",
  //     "choices": [
  //       "A. Yes, especially for console players.",
  //       "B. Yes, it is a great value.",
  //       "C. No, she thinks it is overpriced and lacking in features.",
  //       "D. No, but she recommends similar free custom content for PC players."
  //     ],
  //     "answer": 2
  //   }]

  function createQuestionElement(datum){
    var clone = questionTemplate.content.cloneNode(true);
    var questionElement = clone.querySelector('.question');
    var questionTextElement = clone.querySelector('.question-text');
    var choicesElement = clone.querySelector('.choices');
    questionTextElement.textContent = datum.question;
    // append choices
    datum.choices.forEach((choice)=>{
      let label = document.createElement("label");
      let input = document.createElement("input");
      input.type = 'radio';
      input.name = datum.question;
      input.value = choice;
      // input.id = choice;
      // label.for = choice; 
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      label.appendChild(document.createElement("br"));
      choicesElement.appendChild(label);
    })
    return questionElement;
  }

  
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let currentPageUrl = tabs[0].url;  // Get the current page URL
    // Send a message to the background script
    chrome.runtime.sendMessage({
        contentScriptQuery: "fetchUrl",
        url: currentPageUrl
    }, response => {
        if (response.status === 'success') {
            response.data.forEach(datum => {
                questionList.appendChild(createQuestionElement(datum));
            });
            // console.log('success');
        } else {
            console.error('Error fetching data:', response.error);
        }
    });
  });


});



function getVideoId(url){
  let videoId = new URLSearchParams(url.split("?")[1]).get("v");
  return videoId;
}
