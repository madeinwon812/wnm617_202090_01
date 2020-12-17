
const checkSignupForm = () => {
   let name = $("#signup-name").val();
   let username = $("#signup-username").val();
   let email = $("#signup-email").val();
   let location = $("#signup-location").val();
   let password = $("#signup-password").val();
   let passwordconfirm = $("#signup-confirm").val();

   if(password!=passwordconfirm) {
      throw "Passwords don't match";
      return;
   } else {
      query({type:'insert_user',params:[name,username,email,location,password]})
      .then(d=>{
         if(d.error) {
            throw d.error;
         }
         console.log(d);
         $.mobile.navigate("#signin-page");
      })
   }
}

const checkUserEditForm = () => {
   let name = $("#user-name").val();
   let username = $("#user-username").val();
   let email = $("#user-email").val();
   let location = $("#user-location").val();

   query({
      type:'update_user',
      params:[name,username,email,location,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.go(-2);
   })
}

// Add Coyote form
const checkAnimalAddForm = () => {
   let name = $("#coyote-profile-name").val();
   let breed = $("#coyote-profile-breed").val();
   let years = $("#coyote-profile-years").val();
   let months = $("#coyote-profile-months").val();
   let color = $("#coyote-profile-color").val();
   let gender = $("#coyote-profile-gender").val();
   let description = $("#coyote-profile-description").val();

   query({
      type:'insert_animal',
      params:[sessionStorage.userId,name,breed,years,months,color,gender,description]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }

      $("#coyote-add-form")[0].reset();

      console.log(d);
      sessionStorage.animalId = d.id;
      $.mobile.navigate($("#coyote-add-destination").val());
   })
}

// Add Coyote on Map

const checkAnimalAddMapForm = () => {
   let name = $("#new-coyote-profile-name").val();
   let breed = $("#new-coyote-profile-breed").val();
   let years = $("#new-coyote-profile-years").val();
   let months = $("#new-coyote-profile-months").val();
   let color = $("#new-coyote-profile-color").val();
   let gender = $("#new-oyote-profile-gender").val();
   let description = $("#new-coyote-profile-description").val();

   query({
      type:'insert_animal',
      params:[sessionStorage.userId,name,breed,years,months,color,gender,description]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }

      $("#coyote-add-form")[0].reset();

      console.log(d);
      sessionStorage.animalId = d.id;
      $.mobile.navigate($("#coyote-add-destination").val());
   })
}


const checkAnimalEditForm = () => {
   let name = $("#coyote-name").val();
   let breed = $("#coyote-breed").val();
   let color = $("#coyote-color").val();
   let years = $("#coyote-years").val();
   let months = $("#coyote-months").val();
   let gender = $("#coyote-gender").val();
   let description = $("#coyote-description").val();

   query({
      type:'update_animal',
      params:[name,breed,color,years,months,gender,description,sessionStorage.animalId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.back();
   })
}


const checkLocationAddForm = () => {
   let lat = $("#location-add-lat").val();
   let lng = $("#location-add-lng").val();
   let description = $("#loc-description").val();

   query({
      type:'insert_location',
      params:[sessionStorage.animalId,+lat,+lng,description]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }

      $("#location-add-form")[0].reset();

      console.log(d);

      window.history.go(-2);
   })
}

const checkAnimalDelete = id => {
   query({
      type:'delete_animal',
      params:[id]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.back();
   })
}

const checkSearchForm = async() => {
   let s = $("#search form-input").val()
   console.log(s);

   let r = await query({
      type:"search_animals",
      params:[s,sessionStorage.userId]
   })

   drawAnimalList(r.result,"Search produced no results.");

   console.log(r)
}

const checkListFilter = async ({field,value}) => {
   let r = value=="" ?
      await query({
         type:'animals_by_user_id',
         params:[sessionStorage.userId]
      }) :
      await query({
         type:'filter_animals',
         params:[field,value,sessionStorage.userId]
      });

   drawAnimalList(r.result,"Search produced no results.");
}

const checkUpload = file => {
   let fd = new FormData();
   fd.append("image",file);

   return fetch('data/api.php',{
      method:'POST',
      body:fd
   }).then(d=>d.json());
}


const checkUserUploadForm = () => {
   let upload = $("#user-upload-image").val()
   if(upload=="") return;

   query({
      type:'update_user_image',
      params:[upload,sessionStorage.userId]
   }).then(d=>{
      if(d.error) {
         throw d.error;
      }
      window.history.back();
   })
}