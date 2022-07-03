function cloneSetForm(id){
  currSet = document.querySelectorAll(`#${id} .set`).length;
  console.log(id.slice(id.length -1));
  document.getElementById(`addSetButton${id.slice(id.length -1)}`).insertAdjacentHTML("beforebegin", getSetForm(currSet + 1, parseInt(id.slice(id.length -1))));
}

const addExercise = document.querySelector(".addExercise");
addExercise.addEventListener("click", cloneExerciseForm);

function cloneExerciseForm(){
  currExercise = document.querySelectorAll('.exercises .exercise').length;
  document.querySelector('.exercises').insertAdjacentHTML("beforeend", getExerciseFrom(currExercise + 1));
}

function removeClickHandler(e) {
  if (e.target.matches('.removeSet')) {
    e.target.parentNode.parentNode.remove();
  }
  if (e.target.matches('.addSet')) {
    cloneSetForm(e.target.parentNode.parentNode.parentNode.id);
  }
}

// reference to a list
const exercises = document.querySelector('.exercises');
// add a single listener on list item
exercises.addEventListener('click', removeClickHandler);

const exerciseOptions = document.getElementById('exercise_options');


function getSetForm(currSet, id){
  let setForm = '<div class="row set" id="set' + currSet +'">'+
                    '<div class="col-2">'+
                      '<label>Set ' + currSet + '</label>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E'+ id +'-weight"></input>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E'+ id +'-reps"></input>'+
                    '</div>'+
                    '<div class="col-2">'+
                      '<button type="button" class="btn btn-outline-danger removeSet">Remove Set'+
                      '</button>'+
                    '</div>'+
                  '</div>';
    return setForm;
}

function getExerciseFrom(currExercise){
  let exerciseForm =  '<div class="container exercise" id="exercise' + currExercise +'">' +
                        '<div class="row mt-4">' +
                          '<div class="col-md">' +
                            '<label>Exercise</label>' +
                          '</div>' +
                          '<div class="col-md-10">' +
                          exerciseOptions.innerHTML +
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
                        '<div class="row set" id="set1">' +
                          '<div class="col-2">' +
                            '<label>Set 1</label> ' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'-weight"></input>' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'-reps"></input>' +
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