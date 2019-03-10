const UTILS = {
  debounce : function (func, wait, immediate) {
     let timeout;
     return function () {
         let context = this,
             args = arguments;
         let later = function () {
             timeout = null;
             if (!immediate) func.apply(context, args);
         };
         let callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(context, args);
     };
 },

  startLoading:function () {
         $(".loader").show();
     },

  removeLoading:function () {
         $(".loader").hide();
     },
   usersTemplate:function (user) {
         return `<div class="row">
             <div class="image">
                 <img src='${user.image_url}'>
             </div>
             <div class="details">
                 <div class="name">
                     ${user.name}
                 </div>
                 <div class="description">
                      ${user.department} - ${user.email_id}
                 </div>
             </div>
         </div>`;
     },
     renderUsers:function(users=[]){
       let html="";
       for(let user of users){
         html += this.usersTemplate(user);
       }
       return html;
     }
}
