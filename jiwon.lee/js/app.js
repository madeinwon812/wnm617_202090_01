

$(()=>{

	checkUserId();

	// Event Delegation
	$(document)


	// Routing
	.on("pagecontainerbeforeshow",function(e,ui){

		// console.log(ui.toPage[0].id)

		switch(ui.toPage[0].id){

			case "map-page":
				showRecentPage();
				break;
			case "dog-list-page":
				showListPage();
				break;
			case "dog-profile-page":
				showAnimalPage();
				break;
			case "add-location-page":
				showAddLocationPage();
				break;
			case "user-list-page":
				showUserPage();
				break;
			case "edit-user-page":
				showEditUserPage();
				break;
			case "edit-dog-page":
				showEditAnimalPage();
				break;
			case "map-page":
				showRecentAddChoicePage();
				break;
		}		
	})


	// Forms

	// Login Form
	.on("submit","#login-form",function(e){
		e.preventDefault();
		checkLoginForm();
	})

	// Signup Form
	.on("submit","#signup-form",function(e){
		e.preventDefault();

		// Check if passwords match
		if($("#signup-password").val()!=$("#signup-password2").val()){
			throw "Passwords don't match";
			return;
		}
		
		query({
			type:'insert_user',
			params:[
				$("#signup-name").val(),
				$("#signup-username").val(),
				$("#signup-email").val(),
				$("#signup-city").val(),
				$("#signup-password").val(),
			]
		}).then(d=>{
			if(d.error) throw d.error;
			$.mobile.navigate("#login-page");
		})
	})

	// Add Dog Form

	.on("submit","#add-dog-form",function(e){
		e.preventDefault();
		
		query({
			type:'insert_animal',
			params:[
				sessionStorage.userId,
				$("#dog-profile-name").val(),
				$("#dog-profile-breed").val(),
				$("#dog-profile-years").val(),
				$("#dog-profile-months").val(),
				$("#dog-profile-color").val(),
				$("#dog-profile-gender").val(),
				$("#dog-profile-description").val()
			]
		}).then(d=>{
			if(d.error) throw d.error;

			this.reset();
			showListPage();
		})
	})


	// Search

	.on("submit","#list-search",function(e){
		e.preventDefault();
		let search = $(".search").val();
		if(search=="") {
			showListPage();
		} else {
			query({
				type:'search_animals',
				params:[
					search,
					sessionStorage.userId
				]
			}).then(d=>{
				if(d.error) throw d.error;
				else showListPage(d.result);
			})
		}
	})


	// Clicks

	.on("click",".js-addlocation",function(e){
		query({
			type:'insert_location',
			params:[
				sessionStorage.animalId,
				$("#add-location-lat").val(),
				$("#add-location-lng").val(),
				$("#loc-description").val()
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})


	// Add Dog on Map

	.on("click",".js-addnewanimal",function(e){
		query({
			type:'insert_animal',
			params:[
				sessionStorage.userId,
				$("#new-dog-profile-name").val(),
				$("#new-dog-profile-breed").val(),
				$("#new-dog-profile-years").val(),
				$("#new-dog-profile-months").val(),
				$("#new-dog-profile-color").val(),
				$("#new-dog-profile-gender").val(),
				$("#new-dog-profile-description").val()
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})

	.on("click",".js-edituser",function(e){
		query({
			type:'edit_user',
			params:[
				$("#user-name").val(),
				$("#user-username").val(),
				$("#user-email").val(),
				$("#user-city").val(),
				sessionStorage.userId
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})

	.on("click",".js-editdog",function(e){
		query({
			type:'edit_dog',
			params:[
				$("#dog-name").val(),
				$("#dog-breed").val(),
				$("#dog-color").val(),
				$("#dog-years").val(),
				$("#dog-months").val(),
				$("#dog-gender").val(),
				$("#dog-description").val(),
				sessionStorage.animalId
			]
		}).then(d=>{
			if(d.error) throw d.error;
		})
	})

	.on("click",".js-logout",function(e){
		sessionStorage.removeItem("userId")
		checkUserId();
	})

	.on("click",".animal-jump",function(e){
		if($(this).data("id")===undefined){
			throw("No id defined on this element");
		}
		sessionStorage.animalId = $(this).data("id");
	})


	// Delete dog

	.on("click",".js-deletedog",function(e){
		query({
			type:'delete_animal',
			params:[$(this).data("id")]
		}).then(d=>{
			$.mobile.navigate("#dog-list-page");
		})
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


	// Filter

	.on("click",".filter",function(e) {

		let filter = $(this).data("value");

		if(filter=="") {
			showListPage();
		} else {
			query({
				type:'filter_animals',
				params:[
					filter,
					sessionStorage.userId
				]
			}).then(d=>{
				if(d.error) throw d.error;
				else showListPage(d.result);
			})
		}
	})


	// Upload Dog Image

	.on("click","#dog-profile-page .profile-image",function(e){
		let src = $("#dog-profile-page .profile-image img").attr("src")

		$("#edit-upload-type").val("dog");
		$("#edit-upload-id").val(sessionStorage.animalId);
		$("#edit-upload-filename").val(src);

		$("#edit-upload-page .image-picker")
			.css({"background-image":`url(${src})`})
		$.mobile.navigate("#edit-upload-page");
	})

	.on("change","#edit-upload-image",function(e){
		upload($("#edit-upload-image")[0].files[0])
		.then(d=>{
			if(d.error) throw d;
			else {
				let src = `https://taoranzhou.com/aau/wnm617/uploads/${d.result}`;
				$("#edit-upload-filename").val(src);
				$("#edit-upload-page .image-picker").css("background-image",`url(${src})`);
			}
		})
	})

	.on("click",".js-editupload",function(e){
		query({
			type:'edit_'+$("#edit-upload-type").val()+'_image',
			params:[
				$("#edit-upload-filename").val(),
				$("#edit-upload-id").val()
			]
		})
		.then(d=>{
			if(d.error) throw d;
		})
	})



	// Upload User Image

	.on("click","#edit-user-page .user-profile-image",function(e){
		let src = $("#edit-user-page .user-profile-image img").attr("src")

		$("#edit-user-upload-type").val("user");
		$("#edit-user-upload-id").val(sessionStorage.userId);
		$("#edit-user-upload-filename").val(src);

		$("#edit-user-upload-page .image-picker")
			.css({"background-image":`url(${src})`})
		$.mobile.navigate("#edit-user-upload-page");
	})

	.on("change","#edit-user-upload-image",function(e){
		upload($("#edit-user-upload-image")[0].files[0])
		.then(d=>{
			if(d.error) throw d;
			else {
				let src = `https://taoranzhou.com/aau/wnm617/uploads/${d.result}`;
				$("#edit-user-upload-filename").val(src);
				$("#edit-user-upload-page .image-picker").css("background-image",`url(${src})`);
			}
		})
	})


	.on("click",".js-edituserupload",function(e){
		query({
			type:'edit_'+$("#edit-user-upload-type").val()+'_image',
			params:[
				$("#edit-user-upload-filename").val(),
				$("#edit-user-upload-id").val()
			]
		})
		.then(d=>{
			if(d.error) throw d;
		})
	})


	// Data Activate

	.on("click","[data-activate]",function(e){
		$($(this).data("activate"))
			.addClass("active");
	})


	.on("click","[data-deactivate]",function(e){
		$($(this).data("deactivate"))
			.removeClass("active");
	})

	.on("click","[data-toggle]",function(e){
		$($(this).data("toggle"))
			.toggleClass("active");
	})


	.on("click","[data-activateone]",function(e){
			$($(this).data("activateone"))
				.addClass("active")
				.siblings().removeClass("active");
	})
	;





	$("[data-template]").each(function(){
		let template_id = $(this).data("template");
		let template_str = $(template_id).html();
		$(this).html(template_str);


	})
})