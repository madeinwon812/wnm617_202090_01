
$(()=>{

   checkUserId();

   // Event Delegation
   $(document)


   //Routing
   .on("pagecontainerbeforeshow",function(e,ui) {
    console.log('e', e);
    console.log('ui', ui.toPage[0].id);

      // console.log(ui.toPage[0].id)

      //page routing

      switch(ui.toPage[0].id){

         case "map-page": RecentPage(); break;
         case "coyote-list-page": ListPage(); break;

         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;
         case "user-upload-page": UserUploadPage(); break;

         case "coyote-profile-page": AnimalProfilePage(); break;
         case "coyote-edit-page": AnimalEditPage(); break;

         case "location-add-page": LocationAddPage(); break;
         case "map-page": RecentAddChoicePage(); break;
         
      }     
   })


   // FORM SUBMITS


   //Signin Form
   .on("submit","#signin-form",function(e){
      e.preventDefault();
      checkSigninForm();
   })

   //Signup Form
   .on("submit","#signup-form",function(e){
      e.preventDefault();
      checkSignupForm();
   })

   //List Search Form
   .on("submit","#list-search-form",function(e){
      e.preventDefault();
      checkSearchForm();
   })




   // FORM SUBMIT CLICKS

   .on("click",'.js-user-edit',function(e){
      checkUserEditForm();
   })
   .on("click",'.js-animal-add',function(e){
      checkAnimalAddForm();
   })
   .on("click",'.js-animal-edit',function(e){
      checkAnimalEditForm();
   })
   .on("click",'.js-location-add',function(e){
      checkLocationAddForm();
   })
   .on("click",'.js-user-upload',function(e){
      checkUserUploadForm();
   })




   .on("click",".filter",function(){
      checkListFilter($(this).data());
   })
   .on("change",".image-uploader input",function(){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d)
         makeUploaderImage({
            namespace:'user-upload',
            folder:'uploads/',
            name:d.result
         })
      })
   })




   // ANCHOR CLICKS

   .on("click",'.js-logout',function(e){
      sessionStorage.removeItem('userId');
      checkUserId();
   })

   .on("click",'.js-animal-jump',function(e){
      sessionStorage.animalId = $(this).data("id");
      $.mobile.navigate('#coyote-profile-page');
   })

   .on("click",'.js-animal-delete',function(e){
      checkAnimalDelete($(this).data("id"));
   })

   .on("click",".js-location-jump",function(e){
      sessionStorage.locationId = $(this).data("id");
      $.mobile.navigate("#location-profile-page");
   })





   .on('click','[data-activate]',function(e){
      let target = $(this).data('activate');
      $(target).addClass("active")
   })
   .on('click','[data-deactivate]',function(e){
      let target = $(this).data('deactivate');
      $(target).removeClass("active")
   })
   .on('click','[data-toggle]',function(e){
      let target = $(this).data('toggle');
      $(target).toggleClass("active")
   })
   ;



   $("[data-template]").each(function(){
      let target = $(this).data("template");
      let template = $(target).html();
      $(this).html(template);
   })

})




	