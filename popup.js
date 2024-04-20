// adding a new bookmark row to the popup

const addNewBookmark = () => {};

const viewBookmarks = () => {};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};


document.addEventListener("DOMContentLoaded", () => {
  

  // Fetch current tab URL and extract video ID
  // document.documentElement.requestFullscreen();
  var form = document.getElementById('quiz');
  var questionList = document.getElementById('questions');
  var questionTemplate = document.getElementById('question-template');
  var loadingIndicator = document.getElementById('loading');
  var answer_list = [];

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
    loadingIndicator.style.display = 'flex'; // Show loading indicator
    // Send a message to the background script
    chrome.runtime.sendMessage({
        contentScriptQuery: "fetchUrl",
        url: currentPageUrl
    }, response => {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        if (response.status === 'success') {
            response.data.forEach(datum => {
              answer_list.push(datum.answer);
              questionList.appendChild(createQuestionElement(datum));
            });
            console.log(answer_list);
        } else {
            console.error('Error fetching data:', response.error);
        }
    });
  
    let submitBtn = document.createElement("input");
      submitBtn.type = "submit";
      submitBtn.value = "Submit";
      form.appendChild(submitBtn);
      
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        console.log(form.value);
      });
  });


});



function getVideoId(url){
  let videoId = new URLSearchParams(url.split("?")[1]).get("v");
  return videoId;
}
