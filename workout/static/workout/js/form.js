const addSet = document.querySelector("#addSet");
addSet.addEventListener("click", cloneSetForm);
function cloneSetForm(){
  currSet = document.querySelectorAll('#exercise1 .set').length;
  document.getElementById('addSetButton').insertAdjacentHTML("beforebegin", getSetForm(currSet + 1));
}


function removeClickHandler(e) {
  if (e.target.matches('.removeSet')) {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
  }
}
// reference to a list
const exercise1 = document.querySelector('#exercise1');

// add a single listener on list item
exercise1.addEventListener('click', removeClickHandler);


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
  