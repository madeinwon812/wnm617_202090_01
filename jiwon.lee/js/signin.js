
const makeWarning = (target,message) => {
   $(target).addClass("active")
      .find('.message').html(message);
   setTimeout(()=>{
      $(target).removeClass("active");
   },2000);
}

    
    // Trigger failure modal
    $('#signin-notification').addClass('active');

    // Clear input fields
    $("#signin-username").val();
    $("#signin-password").val();
  


const checkSigninForm = async() => {
   let user = $("#signin-username").val();
   let pass = $("#signin-password").val();

   if(user=='' || pass=='') {
      makeWarning("#signin-warning","Please fill in Username and Password");
      return;
   }

   console.log(user,pass);

   let found_user = await query({
      type:'check_signin',
      params:[user,pass]
   });

   if(found_user.result.length > 0) {
      // logged in
      console.log("success");
      sessionStorage.userId = found_user.result[0].id;

      $("#signin-form")[0].reset();
   } else {
      // not logged in
      console.log("failure");
      sessionStorage.removeItem('userId');

      // DO SOMETHING HERE
      makeWarning("#signin-warning","Login Failed")
   }

   checkUserId();
}


const checkUserId = () => {
   let p = ['#signin-page','#signup-page',''];

   if(sessionStorage.userId === undefined) {
      // not logged in
      if(!p.some(o=>window.location.hash===o))
         $.mobile.navigate("#signin-page");
   } else {
      // logged in
      if(p.some(o=>window.location.hash===o))
         $.mobile.navigate("#map-page");
   }
}
