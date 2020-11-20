
// templater(f=>{}) ([{},{}])

const makeAnimalList = templater(o=>`
   
   <div class="list-item">
      <a href="#coyote-profile-page" class="animal-jump" data-id="${o.id}">
         <img class="coyote-profile-image" src="${o.img}">
      </a>
      <p>${o.name}</p>
   </div>

`);


const makeUserProfile = templater(o=>`

   <h4>Hello ${o.name}</h4>
   <div class="profile-head">
      <div class="user-profile-image">
         <img src="${o.img}">
      </div>
   </div>
   <h5><img src="img/map-pin.svg" class="icon">${o.location}</h5>

`);

const makeAnimalProfile = templater(o=>`

   <div class="display-flex">
      <div class="profile-image flex-none">
         <img class="coyote-profile-image" src="${o.img}">
         <div class="form-control">
            <span><a href="#edit-coyote-page"><img src="img/edit.svg" class="icon"></a><span>
            <span><a href="#" class="js-deletecoyote" data-id="${o.id}"><img src="img/trash.svg" class="icon"></a></span>
         </div>
      </div>
      <div class="flex-stretch">
         <div class="form-control">
            <p><strong>Name</strong>: ${o.name}</p>
         </div>
         <div class="form-control">
            <p><strong>Breed</strong>: ${o.breed}</p>
         </div>
         <div class="form-control">
            <p><strong>Color</strong>: ${o.color}</p>
         </div>
         <div class="form-control">
            <p><strong>Age</strong>: ${o.years} Years ${o.months} Months</p>
         </div>
         <div class="form-control">
            <p><strong>Gender</strong>: ${o.gender}</p>
         </div>
      </div>
   </div>
`);


const makeRecentWindow = templater(o=>`

   <div class="display-flex">
      <div class="flex-none">
         <div class="recent-image">
            <img class="coyote-profile-image" src="${o.img}">
         </div>
      </div>
      <div class="flex-stretch">
         <div class="form-control">
            <p class="form-label"><strong>Name</strong>: ${o.name}</p>
         </div>
         <div class="form-control">
            <p class="form-label"><strong>Breed</strong>: ${o.breed}</p>
         </div>
         <div class="form-control">
            <p class="form-label"><strong>Age</strong>: ${o.years} Years ${o.months} Months</p>
         </div>
         <div class="form-control">
            <p class="form-label"><strong>Gender</strong>: ${o.gender}</p>
         </div>
         <div>
            <a href="#coyote-profile-page" class="form-button-primary animal-jump" data-id="${o.id}">Visit</a>
         </div>
      </div>
   </div>
`);


const makeSelect = (arr,id,selection) => {
   return
   `<div class='form-select'>
      <select id='${id}' data-role="none">${makeOptions(arr,selection)}</select>
   </div>`;
}

const makeOptions = (arr,selection) => {
   return arr.reduce((r,o)=>{
      return r+`<option
         value="${o.value}"
         ${selection==o.value?"selected":""}
         >${o.name}</option>`;
   },'')
}

const makeDataAttributes = (data) => {
   return Object.entries(data).reduce((r,[key,value])=>{
      return r+` data-${key}="${value}" `;
   },'');
}


const makeEditBreedSelect = (breed) => {
   let options = ["Western Coyotes","Central U.S. Coyotes","Eastern Coyotes","Central American Coyotes","Mexican Coyote","Salvador Coyote","Belize Coyote","Honduras Coyote","Southeastern Coyote"];
   return options.reduce((r,o)=>{
      return r+`<option value="${o}" ${breed==o?"selected":""}>${o.toUpperCase()}</option>`;
   },'');
}


const makeEditGenderSelect = (gender) => {
   let options = ["Female","Male"];
   return options.reduce((r,o)=>{
      return r+`<option value="${o}" ${gender==o?"selected":""}>${o.toUpperCase()}</option>`;
   },'');
}



const makeEditUserForm = (o) => {

return `
   <form id="eidt-user-form">
      <div class="form-control">
         <div class="user-profile-image">
            <img src="${o.img}">
         </div>
         <div class="update-user-image">
            <span>Update</span>
         </div>
      </div>
      <div class="form-control">
         <label class="form-label">Full Name</label>
         <input class="form-input" type="text" id="user-name" data-role="none" value="${o.name}">
      </div>
      <div class="form-control">
         <label class="form-label">Username</label>
         <input class="form-input" type="text" id="user-username" data-role="none" value="${o.username}">
      </div>
      <div class="form-control">
         <label class="form-label">Email</label>
         <input class="form-input" type="text" id="user-email" data-role="none" value="${o.email}">
      </div>
      <div class="form-control">
         <label class="form-label">Location</label>
         <input class="form-input" type="text" id="user-location" data-role="none" value="${o.location}">
      </div>
   </form>
   `;
}



const makeEditAnimalForm = (o) => {
return `
   <form class="all-form" id="eidt-coyote-form">
      <div class="form-control">
         <label class="form-label" for="coyote-name">Name</label>
         <input class="form-input" type="text" id="coyote-name" data-role="none" value="${o.name}">
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-breed">Breed</label>
         <select class="form-input" data-role="none" id="coyote-breed">${makeEditBreedSelect(o.breed)}</select>
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-color">Color</label>
         <input class="form-input" type="text" id="coyote-color" data-role="none" value="${o.color}">
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-color">Years</label>
         <input class="form-input" type="text" id="coyote-years" data-role="none" value="${o.years}">
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-color">Months</label>
         <input class="form-input" type="text" id="coyote-months" data-role="none" value="${o.months}">
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-color">Gender</label>
         <select class="form-input" data-role="none" id="coyote-gender">${makeEditGenderSelect(o.gender)}</select>
      </div>
      <div class="form-control">
         <label class="form-label" for="coyote-months">Description</label>
         <input class="form-input" type="text" id="coyote-description" data-role="none" value="${o.description}">
      </div>
      <div class="form-control">
         <a href="#coyote-profile-page" class="form-button-primary js-editcoyote">Save</a>
      </div>
   </form>
`;
}


const makeAddAnimalChoice = async(selection) => {
   let d = await query({
      type:'animals_from_user',
      params:[sessionStorage.userId]
   });


   $(".add-choose-animal").html(
      makeSelect(
         d.result.map(o=>({value:o.id,name:o.name})),
         "add-choose-animal",
         selection
      )
   );
}