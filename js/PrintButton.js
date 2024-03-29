  
export default class PrintButton {

  constructor (container) {

    this.container = container;

  }
  
  addSubmitButton (submitButton){

    const button = `<input id="envio" class="button-properties" type="submit" value="Submit"/>`;
    submitButton.container.innerHTML += button;

  }

  addDefaultAction (arrayCorrectAnswers, tryAndId) {

    document.getElementById("envio").addEventListener("click", event => {
        event.preventDefault();
        this.subbmitAnswers(arrayCorrectAnswers, tryAndId);

    });
  }

  resetForm() {

    this.container.reset();

  }

  subbmitAnswers(arrayCorrectAnswers, tryAndId) {

      let contador = 0;
      let numberQuestion = 0;


      arrayCorrectAnswers.forEach(correctAnswer => {

          numberQuestion++;
          let correct = correctAnswer;
          let answerChecked = document.querySelector(`input[name="question${numberQuestion}"]:checked`);
        
          if (answerChecked == null) {
              alert("Responda todas las preguntas");
          }

          let labelAnswerChecked = answerChecked.labels[0].innerHTML;



          if (labelAnswerChecked.trim() == correct){

              contador++;

          }
        
      })

      this.showResults(contador, tryAndId, arrayCorrectAnswers);
  }

  showResults (corrects, tryAndId, arrayCorrectAnswers) {
      let textCorrects = '';
      tryAndId[1]++;
      corrects == 1 ? textCorrects = "correcta" : textCorrects = "correctas";
      const results = `<div class="card space-top try-cards" >
                          <h4 class="card-header">Intento ${tryAndId[1]} </h4>
                            <div class="card-body">
                               "Tienes ${corrects} respuestas ${textCorrects}"                
                            </div>
                        </div>`
      this.container.innerHTML += results;
      this.resetForm();
      this.addDefaultAction(arrayCorrectAnswers, tryAndId);
  }
}
