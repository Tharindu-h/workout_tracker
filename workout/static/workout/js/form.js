const addSet = document.querySelector("#addSet");
addSet.addEventListener("click", cloneSetForm);
function cloneSetForm(){
  const clonedSet = document.getElementById("set1").cloneNode(true);
  console.log(clonedSet);
  const target = document.querySelector('#addSetButton');
  target.before(clonedSet);
}


function removeClickHandler(e) {
  if (e.target.matches('#removeSet')) {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.remove();
  }
}
// reference to a list
const exercise1 = document.querySelector('#exercise1');

// add a single listener on list item
exercise1.addEventListener('click', removeClickHandler);
