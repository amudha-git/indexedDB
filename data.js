const users = (function(){

   let data = [];
   const department = ['cliq','salesiq','crm'];
   let random = department[Math.floor(Math.random() * Math.floor(3))];

   for(let i=1;i<=50000;i++){
     let obj = {
       zuid : i,
       email_id: `sample${i}@samplemail.com`,
       name:`name${i}`,
       department:'crm',
       image_url:'https://via.placeholder.com/150'
     }
     if(i==1 || i==5000 || i==20000 || i==5000)
     obj.department = 'cliq';

     data.push(obj);
   }

  return{
    data
  }
})();
