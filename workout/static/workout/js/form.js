const addSet = document.querySelector(".addSet");
addSet.addEventListener("click", cloneSetForm);
function cloneSetForm(){
  currSet = document.querySelectorAll('#exercise1 .set').length;
  document.getElementById('addSetButton').insertAdjacentHTML("beforebegin", getSetForm(currSet + 1));
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
    // use event delegation to get the eventListeners to work with
    // dynamically created items
  }
}
// reference to a list
const exercises = document.querySelector('.exercises');

// add a single listener on list item
exercises.addEventListener('click', removeClickHandler);


function getSetForm(currSet){
  let setForm = '<div class="row set" id="set' + currSet +'">'+
                    '<div class="col-2">'+
                      '<label>Set ' + currSet + '</label>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E1S1-weight"></input>'+
                    '</div>'+
                    '<div class="col-3">'+
                      '<input type="text" class="form-control" name="E1S1-reps"></input>'+
                    '</div>'+
                    '<div class="col-2">'+
                      '<button type="button" class="btn btn-outline-danger removeSet">Remove Set'+
                      '</button>'+
                    '</div>'+
                  '</div>';
    return setForm;
}

function getExerciseFrom(currExercise){
  let exerciseForm =  '<div class="container" id="exercise' + currExercise +'">' +
                        '<div class="row mt-4">' +
                          '<div class="col-md">' +
                            '<label>Exercise</label>' +
                          '</div>' +
                          '<div class="col-md-10">' +
                            '<select name="exercise">' +
                              '<option value="----">----</option>' +
                              '{% for exercise in exercises %}' +
                                '<option value="{{ exercise.name }}">{{ exercise.name }}</option>' +
                              '{% endfor %}' +
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
                        '<div class="row set" id="set1">' +
                          '<div class="col-2">' +
                            '<label>Set 1</label> ' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'S1-weight"></input>' +
                          '</div>' +
                          '<div class="col-3">' +
                            '<input type="text" class="form-control" name="E'+ currExercise +'S1-reps"></input>' +
                          '</div>' +
                          '<div class="col-2">' +
                            '<button type="button" class="btn btn-outline-danger removeSet">Remove Set' +
                            '</button>' +
                          '</div>' +
                        '</div>' +
                        '<div class="row mt-2 justify-content-start" id="addSetButton">' +
                          '<div class="col-2"></div>' +
                          '<div class="col-3">' +
                            '<button type="button" class="btn btn-outline-success" id="addSet">Add New Set</button>' +
                          '</div>' +
                        '</div>' +
                      '</div>';
  return exerciseForm;
}