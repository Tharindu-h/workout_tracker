const exercises = document.querySelector('.exercises');
const addExercise = document.querySelector(".addExercise");
exercises.addEventListener('click', eventDelegationForClickEvents);
addExercise.addEventListener("click", cloneExerciseForm);

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
  let inputBox = document.getElementById(`exercise-input-${parseInt(exerciseNum.slice(exerciseNum.length -1))}`);

  if (e.target.value == "Other") {
    if (!inputBox) {
      document.getElementById(e.target.parentNode.parentNode.id).insertAdjacentHTML("afterend", addOtherInputBox(parseInt(exerciseNum.slice(exerciseNum.length -1))));
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
    for (let i = 1; i <= currExercise; i++) {
      console.log("test");
      $(`#select-e${i}`).select2('destroy');
    }
    addSelect2();
  });
}



function cloneSetForm(id){
  let currSet = document.querySelectorAll(`#${id} .set`).length;
  let currExercise = document.querySelectorAll('.exercises .exercise').length;
  document.getElementById(`addSetButton${id.slice(id.length -1)}`).insertAdjacentHTML("beforebegin", getSetForm(parseInt(id.slice(id.length -1)), currSet + 1));
}


function validateForm(){
  let regExp = /^\d+(\.\d{1,2})?$/;
  let numExercises = document.querySelectorAll('.exercises .exercise').length;
  for (let e = 1; e <= numExercises; e++){
    if (document.getElementById(`select-e${e}`).value == "----"){
      return false;
    }
    numSets = document.querySelectorAll(`#exercise${e} .set`).length;
    for (let s = 1; s <= numSets; s++){
      let currReps   = document.getElementById(`e${e}-set${s}-reps`).value;
      let currWeight = document.getElementById(`e${e}-set${s}-weight`).value;
      if (currReps == "" || currWeight == "" || !regExp.test(currReps) || !regExp.test(currWeight)){
        return false;
      }
    }
  }

  return true;
}


function addOtherInputBox(exerciseNumber){
  let inputBox =  `<div class="row justify-content-between" id="exercise-input-${exerciseNumber}">` +
                    `<div class="col">` +
                      `<div>Exercise:</div>` +
                    `</div>` +
                    `<div class="col">` +
                      `<input type="text" name="test" style="width: 240px;"></input>` +
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
                    '<div class="col-2">'+
                      '<button type="button" class="btn btn-outline-danger removeSet">Remove Set'+
                      '</button>'+
                    '</div>'+
                  '</div>';
    return setForm;
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
                            '<select name="exercise" style="width:240px" class="select-exercise" id="select-e'+ currExercise +'">' +
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
                          '<div class="col-2">' +
                            '<button type="button" class="btn btn-outline-danger removeSet">Remove Set' +
                            '</button>' +
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