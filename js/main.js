  
import Question from './Question.js'
import PrintQuestion from './PrintQuestion.js'
import NotFoundQuestion from './NotFoundQuestion.js' 

[...document.getElementsByClassName('form-control')].forEach(selected => {
    selected.addEventListener('change', () => getQuestions())
})

function getQuestions() {

    const questionQuantity = document.getElementById('questions-number').value;
    const questionCategory = document.getElementById('questions-category').value;
    const questionDifficulty = document.getElementById('questions-difficulty').value;
    const questionType = document.getElementById('questions-type').value;
    
    let link = `https://opentdb.com/api.php?amount=${questionQuantity}`;
        
        if(questionCategory != 'any') { 
            link += `&category=${questionCategory}`; 
        };
        if(questionDifficulty != 'any') { 
            link += `&difficulty=${questionDifficulty}`; 
        };
        if(questionType != 'any') { 
            link += `&type=${questionType}`; 
        };

        const container = document.getElementsByClassName('container')[0];
        container.innerHTML = '';

        let arrayCorrectAnswers = [];
        let tryAndId = [0,0];

    fetch(link)
        .then(response => response.json())
        .then( data => {
            if (data.results.length != 0) {

                data.results.forEach( dataQuestion => {
                    const question = new Question(dataQuestion);
                    const printQuestions = new PrintQuestion();
                    printQuestions.printCard(question, arrayCorrectAnswers, tryAndId, questionQuantity);
                })

            } else {
                const noQuestions = new NotFoundQuestion(container);
                noQuestions.printMessageNotFoundQuestion();
            }
        })
}
