window.onload = function(){

(function(){

function init(){
initEvent();
}

function initEvent(){
  $("#searchBox").on('keyup', UTILS.debounce(handleKeyup, 200));
}

function handleKeyup(event){
  let value = event.target.value;
  clearResults();

  const users =  fetchResults(value);

  renderUI(users);

}


function fetchResults(value){
  if(!value)
  return;

  const regex = new RegExp(`${value}`,'i');

  let results = [];
  let users = getUsers();
  let limit = 100 || Number.MAX_VALUE;
  let count = 0;

  start=performance.now();

  for(let user of users){
  if(count == limit)
   break;
  if(regex.test(user.email_id)|| regex.test(user.department) || regex.test(user.name)) {
    results.push(user);
    count++;
  }
  }

  end=performance.now();

  console.log(`Time taken is ${end-start} milliseconds using js object`);
  console.log(`total users is ${results.length}`);
  return results;
}


function renderUI(results = []){

  if(!results)
  return;

  $("#results-container").html(UTILS.renderUsers(results));

}

function getUsers(){
  return users.data;
}

function clearResults(){
  $("#results-container").html("");
}

init();

})();


}
