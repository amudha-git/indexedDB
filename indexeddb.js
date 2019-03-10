window.onload =  function(){
(function(){
  let db;
  let start;
  let end;

   async function init(){

    try {
      await openDB();
      console.log("data populated");
      initEvents();
    }
    catch(e){
      console.log("DB is not openning.  .");
    }

  }

   async function openDB(){

    db = new Dexie("user_database");
    db.version(1).stores({
      users:'zuid,email_id,name,department,image_url'
    });
    db.on('ready',()=>{
      return db.users.count((count)=>{
        if(count > 0){
          console.log("already populated");
        }
        else{
          console.log("populating data");
          db.users.bulkPut(users.data);
        }
      })
    });
    await db.open();

  }

  function initEvents(){
    $("#searchBox").on('keyup', UTILS.debounce(handleKeyup, 200));
  }



  async function handleKeyup(event){

    const value = event.target.value;
    clearResults();

    const results = await fetchResults(value);

    console.log(`total users is ${results.length}`);

    renderUI(results);

  }

   async function fetchResults(value=''){

    if(!value)
    return;

    try{
       UTILS.startLoading();
      start=performance.now();

      const regex = new RegExp(`${value}`,'i');
      let results = [];
      let limit = 100;
      let count = 0;

       //starts with search
       const users = await db.users.where('email_id').startsWithIgnoreCase(value).or('name').startsWithIgnoreCase(value)
                     .or('department')
                     .startsWithIgnoreCase(value)
                     .limit(100)
                     .toArray();

     //   //contains search
     //   // const users = await db.users.filter(user => regex.test(user.email_id)|| regex.test(user.department) || regex.test(user.name))
     //   //               .toArray();
     //   let collection = await db.users.toArray();
     //   for(let user of collection){
     //   if(count == limit)
     //    break;
     //   if(regex.test(user.email_id)|| regex.test(user.department) || regex.test(user.name)) {
     //     results.push(user);
     //     count++;
     //   }
     // }

       end=performance.now();
       console.log(`Time taken is ${end-start} milliseconds using indexed db`);
       UTILS.removeLoading();
       return users;
     }
     catch(e){
       UTILS.removeLoading();
       console.log('error');
     }

  }

  function renderUI(results = []){

    if(!results)
    return;

    $("#results-container").html(UTILS.renderUsers(results));

  }

  function clearResults(){
    $("#results-container").html("");
  }

  init();

})();

}
