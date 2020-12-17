

const blank_animal = {
	name:'',
	breed:'',
	color:'',
	years:'',
	months:'',
	gender:'',
	description:''
};

// ASYNC
//const ListPage = async() => {
//   let d = await query({type:'animals_by_user_id',params:[sessionStorage.userId]});

   //console.log(d);

//   $("#list-page .filter-list").html(makeFilterList(d.result));

//   drawAnimalList(d.result); }

const ListPage = async (animals) => {
	if(animals===undefined) {
		let d = await query({
			type:'animals_by_user_id',
			params:[sessionStorage.userId]
		});
		animals = d.result;
	}

	// console.log(d);

	$("#list-page .coyote-list")
		.html(makeAnimalList(animals));
}

const UserProfilePage = async () => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	//console.log(d);

	$("#user-profile-page .profile-head")
	    .html(makeUserProfile(d.result));
}

const UserEditPage = async () => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	$("#user-edit-page .user-edit-form")
		.html(makeUserEditForm(d.result[0]))
}

const UserUploadPage = async() => {
   query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   }).then(d=>{
      makeUploaderImage({
         namespace:'user-upload',
         folder:'',
         name:d.result[0].img
      })
   })
}

const callAnimalProfile = (id,target) => {
	query({
		type:'animal_by_id',
		params:[id]
	}).then(d=>{

		$(target).html(makeAnimalProfile(d.result));

		$("#coyote-profile-page .profile-description").html(d.result[0].description)
	});
}


const callAnimalMap = (id,target) => {
	query({
		type:'locations_by_animal_id',
		params:[id]
	}).then(async d=>{
		let map_el = await makeMap(target);

		makeMarkers(map_el,d.result);
	});
}


const AnimalProfilePage = async() => {
   if(sessionStorage.animalId===undefined) {
		throw("No animal id defined");
	}

	callAnimalProfile(
		sessionStorage.animalId,
		"#coyote-profile-page .profile-top");

	callAnimalMap(
		sessionStorage.animalId,
		"#coyote-profile-page .map");
}


const AnimalEditPage = async () => {
	let d = await query({
		type:'animal_by_id',
		params:[sessionStorage.animalId]
	});

	$("#coyote-edit-page .coyote-edit-form")
		.html(makeEditAnimalForm(d.result[0]))
}

const RecentAddChoicePage = async (selection) => {
	$("#add-location-redirect").val("#map-page");
	makeAddAnimalChoice(selection);
}

const RecentPage = async () => {

	let d = await query({
		type:'recent_locations',
		params:[sessionStorage.userId]
	});

	console.log(d)

	let animals = d.result.reduce((r,o)=>{
		o.icon = o.img;
		// o.icon = `img/icons/icon_${o.type}.svg`;
		if(o.lat && o.lng) r.push(o)
		return r;
	},[]);

	let map_el = await makeMap("#map-page .map");

	makeMarkers(map_el,animals);

	map_el.data("markers").forEach((o,i)=>{
		o.addListener("click",function(e){

			// $("#map-page .basin")
			// 	.addClass("active")
			// 	.html(makeRecentWindow(animals[i]))

			map_el.data("infoWindow")
				.open(map_el.data("map"),o)
			map_el.data("infoWindow")
				.setContent(makeRecentWindow(animals[i]));
		})
	});

	map_el.data("map").addListener("click",function(e){
		$("#map-page .basin")
			.removeClass("active")
	});

}


const LocationAddPage = async() => {
   let map_el = await makeMap("#location-add-page .map");
   makeMarkers(map_el,[]);

   let map = map_el.data('map');

   map.addListener("click",function(e){
      console.log(e)
      let posFromClick = {lat:e.latLng.lat(),lng:e.latLng.lng()};
      let posFromCenter = {lat:map.getCenter().lat(),lng:map.getCenter().lng()};
      console.log(posFromClick,posFromCenter)
      $("#location-add-lat").val(posFromClick.lat)
      $("#location-add-lng").val(posFromClick.lng)

      makeMarkers(map_el,[posFromClick],false);
   });


}

