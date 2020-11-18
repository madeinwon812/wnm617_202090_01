

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
const showListPage = async (animals) => {
	if(animals===undefined) {
		let d = await query({
			type:'animals_from_user',
			params:[sessionStorage.userId]
		});
		animals = d.result;
	}

	// console.log(d);

	$("#coyote-list-page .coyote-list")
		.html(makeAnimalList(animals));
}

const showUserPage = async () => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	// console.log(d);

	$("#user-list-page .profile-head").html(makeUserProfile(d.result));
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
		type:'locations_from_animal',
		params:[id]
	}).then(async d=>{
		let map_el = await makeMap(target);

		makeMarkers(map_el,d.result);
	});
}


const showAnimalPage = async () => {
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

const showRecentPage = async () => {

	let d = await query({
		type:'recent_animal_locations',
		params:[sessionStorage.userId]
	});

	console.log(d)

	let animals = d.result.reduce((r,o)=>{
		o.icon = o.img;
		// o.icon = `img/icons/icon_${o.type}.svg`;
		if(o.lat) r.push(o)
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

const showAddLocationPage = async () => {

	let map_el = await makeMap("#add-location-page .map");

	let m = false;

	map_el.data("map").addListener("click",function(e){
		let pos = {
			lat:e.latLng.lat(),
			lng:e.latLng.lng()
		};

		if(m!=false) m.setMap(null);

		$("#add-location-lat").val(pos.lat);
		$("#add-location-lng").val(pos.lng);

		m = new google.maps.Marker({
			position: pos,
			map: map_el.data("map")
		});
	});

	setMapBounds(map_el.data("map"),[]);
}

const showEditUserPage = async () => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	$("#edit-user-page .edit-user-form")
		.html(makeEditUserForm(d.result[0]))
}

const showEditAnimalPage = async () => {
	let d = await query({
		type:'animal_by_id',
		params:[sessionStorage.animalId]
	});

	$("#edit-coyote-page .edit-coyote-form")
		.html(makeEditAnimalForm(d.result[0]))
}

const showRecentAddChoicePage = async (selection) => {
	$("#add-location-redirect").val("#map-page");
	makeAddAnimalChoice(selection);
}
