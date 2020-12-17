
$(()=>{

   checkUserId();

   // Event Delegation
   $(document)


   //Routing
   .on("pagecontainerbeforeshow",function(e,ui) {

      // console.log(ui.toPage[0].id)

      //page routing

      switch(ui.toPage[0].id){

         case "map-page": RecentPage(); break;
         case "list-page": ListPage(); break;

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
   .on("click",'.js-animal-add',function(e){
      checkAnimalAddMapForm();
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

   .on("click","[data-activateone]",function(e){
         $($(this).data("activateone"))
            .addClass("active")
            .siblings().removeClass("active");
   })
   ;


})

// Nav tabs

   .on("click",".nav-tabs a",function(e){
      let id = $(this).parent().index();
      $(this).parent().addClass("active")
         .siblings().removeClass("active");

      $(this).parent().parent().parent().next().children()
         .eq(id).addClass("active")
         .siblings().removeClass("active")
   })


// Upload Coyote Image

   .on("click","#coyote-profile-page .profile-image",function(e){
      let src = $("#coyote-profile-page .profile-image img").attr("src")

      $("#edit-upload-type").val("coyote");
      $("#edit-upload-id").val(sessionStorage.animalId);
      $("#edit-upload-filename").val(src);

      $("#edit-upload-page .image-picker")
         .css({"background-image":`url(${src})`})
      $.mobile.navigate("#edit-upload-page");
   })

   

   // Upload User Image

   .on("click","#user-edit-page .user-upload-image",function(e){
      let src = $("#user-edit-page .user-upload-image img").attr("src")

      $("#user-upload-type").val("user");
      $("#user-upload-id").val(sessionStorage.userId);
      $("#user-upload-filename").val(src);

      $("#user-upload-page .image-picker")
         .css({"background-image":`url(${src})`})
      $.mobile.navigate("#user-upload-page");
   })

   .on("change","#user-upload-image",function(e){
      upload($("#user-upload-image")[0].files[0])
      .then(d=>{
         if(d.error) throw d;
         else {
            let src = `https://madeinwon.com/aau/wnm617/jiwon.lee/uploads/${d.result}`;
            $("#user-upload-filename").val(src);
            $("#user-upload-page .image-picker").css("background-image",`url(${src})`);
         }
      })
   })


   .on("click",".js-user-upload",function(e){
      query({
         type:'edit_'+$("#user-upload-type").val()+'_image',
         params:[
            $("#user-upload-filename").val(),
            $("#user-upload-id").val()
         ]
      })
      .then(d=>{
         if(d.error) throw d;
      })
   })
   

   .on("submit","#list-search-form",function(e){
      e.preventDefault();
      let search = $(".search").val();
      if(search=="") {
         ListPage();
      } else {
         query({
            type:'search_animals',
            params:[
               search,
               sessionStorage.userId
            ]
         }).then(d=>{
            if(d.error) throw d.error;
            else ListPage(d.result);
         })
      }
   })


	