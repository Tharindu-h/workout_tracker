const workout = document.querySelector('.workout');
const addWorkout = document.querySelector(".addWorkout");
workout.addEventListener('click', eventDelegationForClickEvents);
addWorkout.addEventListener("click", cloneWorkoutForm);

addSelect2();

// apply select2 to all existing exercise select boxes
function addSelect2(){
  let numInitialExercises = document.querySelectorAll('.exercise').length;
  for (let i = 1; i <= numInitialExercises; i++){
    $(document).ready(function(){
      $(`#select-e${i}`).select2();
    });
    $(`#select-e${i}`).on("change", checkSelectedExercise);
  }
}
function checkSelectedExercise(e){
  let exerciseNum = e.target.parentNode.parentNode.parentNode.id;
  exerciseNum = getIntegerFromStr(exerciseNum);
  let inputBox = document.getElementById(`exercise-input-${exerciseNum}`);

  if (e.target.value == "Other") {
    if (!inputBox) {
      document.getElementById(e.target.parentNode.parentNode.id).insertAdjacentHTML("afterend", addOtherInputBox(parseInt(exerciseNum.slice(exerciseNum.length -1))));
      console.log(e.target.name);
      e.target.name = `ignore${exerciseNum}`
    }
  }
  else {
    if(inputBox){
      inputBox.remove();
    }
  }
}

function eventDelegationForClickEvents(e) {
  if (e.target.matches('.removeSet')) {
    e.target.parentNode.parentNode.remove();
  }
  if (e.target.matches('.addSet')) {
    cloneSetForm(e.target.parentNode.parentNode.parentNode.id);
  }
  if (e.target.matches('.removeExercise')) {
    e.target.parentNode.parentNode.parentNode.remove();
  }
  if (e.target.matches('.addExercise')) {
    cloneExerciseForm();
  }
}

function cloneExerciseForm(){
  fetch('/api/workout/exercise-types')
  .then(response => response.json())
  .then(function(data){
    let options = "";
    for (let option = 0; option < data.length; option++){
      options +=`<option value="${data[option].name}" class="options">${data[option].name}</option>`;
    }
    let currExercise = document.querySelectorAll('.exercises .exercise').length;
    document.querySelector('.exercises').insertAdjacentHTML("beforeend", getExerciseFrom(currExercise + 1, options));
    addSelect2();
  });
}



function cloneSetForm(id){
  let currSet = document.querySelectorAll(`#${id} .set`).length;
  let currExercise = document.querySelectorAll('.exercises .exercise').length;
  let idNumber = getIntegerFromStr(id)
  document.getElementById(`lsrpe${idNumber}`).insertAdjacentHTML("beforebegin", getSetForm(idNumber, currSet + 1));
}


function validateForm(){
  let regExp = /^\d+(\.\d{1,2})?$/;
  let numExercises = document.querySelectorAll('.exercises .exercise').length;
  for (let e = 1; e <= numExercises; e++){
    if (document.getElementById(`select-e${e}`).value == "----"){
      document.getElementById(`exercise${e}`).insertAdjacentHTML("afterbegin", getFromValidateMessage("Please select an exercise"));
      return false;
    }
    numSets = document.querySelectorAll(`#exercise${e} .set`).length;
    for (let s = 1; s <= numSets; s++){
      let currReps   = document.getElementById(`e${e}-set${s}-reps`).value;
      let currWeight = document.getElementById(`e${e}-set${s}-weight`).value;
      if (currReps == "" || !regExp.test(currReps)) {
        console.log("here");
        document.getElementById(`exercise${e}`).insertAdjacentHTML("afterbegin", getFromValidateMessage(`Invalid input for set ${s} reps, please note only numbers are valid as reps`));
        return false;
      }
      if (currWeight == "" || !regExp.test(currWeight)) {
        document.getElementById(`exercise${e}`).insertAdjacentHTML("afterbegin", getFromValidateMessage(`Invalid input for set ${s} weight, please note only numbers are valid as weight`));
        return false;
      } 
    }
  }

  return true;
}

function cloneWorkoutForm(){
  fetch('/api/workout/exercise-types')
  .then(response => response.json())
  .then(function(data){
    let options = "";
    for (let option = 0; option < data.length; option++){
      options +=`<option value="${data[option].name}" class="options">${data[option].name}</option>`;
    }
    let currWorkout = document.querySelectorAll('.workout').length;
    document.querySelector('.addWorkout').insertAdjacentHTML("beforebegin", getWorkoutForm(currWorkout + 1, options));
    addSelect2();
  });
}

function addOtherInputBox(exerciseNumber){
  let inputBox =  `<div class="row justify-content-between" id="exercise-input-${exerciseNumber}">` +
                    `<div class="col">` +
                      `<label>Exercise</label>` +
                    `</div>` +
                    `<div class="col">` +
                      `<input type="text" class="select-exercise" name="exercise"></input>` +
                    `</div>` +
                  `</div>`;
  return inputBox; 
}

function getSetForm(currExercise, currSet, id){
  let setForm = '<div class="row set" id="'+ 'e' + currExercise + '-' + 'set' + currSet +'">'+
                    '<div class="col-2">'+
                      '<label>Set ' + currSet + '</label>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E'+ currExercise +'-weight" id="e'+ currExercise +'-set'+ currSet +'-weight"></input>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E'+ currExercise +'-reps" id="e'+ currExercise +'-set'+ currSet +'-reps"></input>'+
                    '</div>'+
                    '<div class="col-2 remove-set-button">'+
                      '<button type="button" class="btn btn-outline-danger removeSet">Remove Set'+
                      '</button>'+
                    '</div>'+
                  '</div>';
  return setForm;
}

function getIntegerFromStr(str) {
  let num = str.match(/\d/g);
  num = num.join("");
  return num;
}

function getExerciseFrom(currExercise, options){

  let exerciseForm =  '<hr>' + 
                      '<div class="container exercise" id="exercise' + currExercise +'">' +
                        '<div class="row">' +
                          '<small class="help-text">Select option \'Other\' to add exercises not listed here</small>' +
                        '</div>' +
                        '<div class="row justify-content-between mt-4" id="select-e'+ currExercise +'-div">' +
                          '<div class="col">' +
                            '<label>Exercise</label>' +
                          '</div>' +
                          '<div class="col" id="exercise_options'+ currExercise +'">' +
                            '<select name="exercise" class="select-exercise" id="select-e'+ currExercise +'">' +
                              '<option value="----">----</option>' +
                              '<option value="Other">Other</option>' +
                              options +
                            '</select>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row mt-4">' +
                          '<div class="col-2">' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<div class="d-flex justify-content-center">Weight</div>' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<div class="d-flex justify-content-center">Reps</div>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row set" id="e'+ currExercise + '-' +'set1">' +
                          '<div class="col-2">' +
                            '<label>Set 1</label> ' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'-weight" id="e'+ currExercise +'-set1-weight"></input>' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'-reps" id="e'+ currExercise +'-set1-reps"></input>' +
                          '</div>' +
                          '<div class="col-2 remove-set-button">' +
                            '<button type="button" class="btn btn-outline-danger removeSet">Remove Set' +
                            '</button>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row mt-4" id="lsrpe'+ currExercise +'">' +
                          '<small class="help-text">Last Set Rate of Perceived Exertion (1-10)</small>' +
                        '</div>' +
                        '<div class="row">' +
                          '<div class="col-2">' +
                            '<label>LSRPE</label>' + 
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'-lsrpe" id="e'+ currExercise +'-lsrpe"></input>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row mt-2 justify-content-start" id="addSetButton'+ currExercise +'">' +
                          '<div class="col-2"></div>' +
                          '<div class="col-3">' +
                            '<button type="button" class="btn btn-outline-success addSet">Add New Set</button>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row mt-2 justify-content-start" id="removeExercise1">' +
                          '<div class="col-2"></div>' +
                            '<div class="col-3">' +
                              '<button type="button" class="btn btn-danger removeExercise">Remove Exercise</button>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>';
  return exerciseForm;
}

function getFromValidateMessage(message) {
  return `<div class="row">
            <p class="form-validation-instruction">
              ${message}
            </p>
          </div>`;
}

function getWorkoutForm(currWorkout, options) {
  return  `<div class="content-section mt-4" id="workout${currWorkout}">`+
            `<fieldset class="form-group workout">`+
              `<legend class="border-bottom mb-4">New Workout</legend>`+
              `<div class="container">`+
                `<div class="row mt-2">`+
                  `<div class="col-4">`+
                    `<label>Workout Name</label>`+
                  `</div>`+
                  `<div class="col-8">`+
                    `<input type="text" class="form-control" name="name"></input>`+
                  `</div>`+
                `</div>`+
              `</div>`+
              `<div class="exercises">`+
                `<hr>`+
                `<div class="container exercise" id="exercise1">`+
                  `<div class="row">`+
                    `<small class="help-text">Select option 'Other' to add exercises not listed here</small>`+
                  `</div>`+
                  `<div class="row justify-content-between mt-4" id="select-e1-div">`+
                    `<div class="col">`+
                      `<label>Exercise</label>`+
                    `</div>`+
                    `<div class="col" id="exercise_options">`+
                      `<select name="exercise" class="select-exercise" id="select-e1">`+
                      `<option value="----">----</option>` +
                      `<option value="Other">Other</option>` +
                      options +
                      `</select>`+
                    `</div>`+
                  `</div>`+
                  `<div class="row mt-4">`+
                    `<div class="col-2">`+
                    `</div>`+
                    `<div class="col-3">`+
                      `<div class="d-flex justify-content-center">Weight</div>`+
                    `</div>`+
                    `<div class="col-3">`+
                      `<div class="d-flex justify-content-center">Reps</div>`+
                    `</div>`+
                  `</div>`+
                  `<div class="row set" id="e1-set1">`+
                    `<div class="col-2">`+
                      `<label>Set 1</label> `+
                    `</div>`+
                    `<div class="col-3">`+
                      `<input type="text" class="form-control" name="E1-weight" id="e1-set1-weight"></input>`+
                    `</div>`+
                    `<div class="col-3">`+
                      `<input type="text" class="form-control" name="E1-reps" id="e1-set1-reps"></input>`+
                    `</div>`+
                    `<div class="col-2 remove-set-button">`+
                      `<button type="button" class="btn btn-outline-danger removeSet">Remove Set`+
                      `</button>`+
                    `</div>`+
                  `</div>`+
                  `<div class="row mt-4" id="lsrpe1">`+
                    `<small class="help-text">Last Set Rate of Perceived Exertion (1-10)</small>`+
                  `</div>`+
                  `<div class="row">`+
                    `<div class="col-2">`+
                      `<label>LSRPE</label> `+
                    `</div>`+
                    `<div class="col-3">`+
                      `<input type="text" class="form-control" name="E1-lsrpe" id="e1-lsrpe"></input>`+
                    `</div>`+
                  `</div>`+
                  `<div class="row mt-2 justify-content-start" id="addSetButton1">`+
                    `<div class="col-2"></div>`+
                    `<div class="col-3">`+
                      `<button type="button" class="btn btn-outline-success addSet">Add New Set</button>`+
                    `</div>`+
                  `</div>`+
                  `<div class="row mt-2 justify-content-start" id="removeExercise1">`+
                    `<div class="col-2"></div>`+
                    `<div class="col-3">`+
                      `<button type="button" class="btn btn-danger removeExercise">Remove Exercise</button>`+
                    `</div>`+
                  `</div>`+
                `</div>`+
              `</div>`+
              `<hr>`+
              `<div class="container">`+
                `<button type="button" class="btn btn-outline-success addExercise">Add New Exercise</button>`+
              `</div>`+
            `</fieldset>`+
          `</div>`;
}