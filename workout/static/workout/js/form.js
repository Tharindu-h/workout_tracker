// reference to a list
const exercises = document.querySelector('.exercises');
// add a single listener on list item
exercises.addEventListener('click', eventDelegationForClickEvents);
const exerciseOptions = document.getElementById('exercise_options'); 
const addExercise = document.querySelector(".addExercise");
addExercise.addEventListener("click", cloneExerciseForm);

// apply select2 to all existing exercise select boxes on page load
let numInitialExercises = document.querySelectorAll('.exercise').length;
for (let i = 1; i <= numInitialExercises; i++){
  $(document).ready(function(){
    $(`#select-e${i}`).select2();
  });
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
    $(document).ready(function(){
      $(`#select-e${currExercise + 1}`).select2();
    });
  });
}


function cloneSetForm(id){
  let currSet = document.querySelectorAll(`#${id} .set`).length;
  let currExercise = document.querySelectorAll('.exercises .exercise').length;
  document.getElementById(`addSetButton${id.slice(id.length -1)}`).insertAdjacentHTML("beforebegin", getSetForm(parseInt(id.slice(id.length -1)), currSet + 1));
}

// function cloneExerciseForm(){
//   let currExercise = document.querySelectorAll('.exercises .exercise').length;
//   document.querySelector('.exercises').insertAdjacentHTML("beforeend", getExerciseFrom(currExercise + 1));
// }

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
                        '<div class="row justify-content-between mt-4">' +
                          '<div class="col">' +
                            '<label>Exercise</label>' +
                          '</div>' +
                          '<div class="col" id="exercise_options'+ currExercise +'">' +
                            '<select name="exercise" style="width:240px" class="select-exercise" id="select-e'+ currExercise +'">' +
                              '<option value="----">----</option>' +
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
                      '</div>';
  return exerciseForm;
}