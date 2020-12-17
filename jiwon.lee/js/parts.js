

// templater(f=>{}) ([{},{}])

   
const makeAnimalList = templater(o=>`
   
   <div class="coyote-list-item js-animal-jump" data-id="${o.id}">
         <div class="coyote-list-icon">
           <img src="${o.img}" alt="">
         </div>
         <div class="coyote-list-description">
           <div class="coyote-list-name">${o.name}</div>
           <div class="coyote-list-breed"><strong>Breed</strong> ${o.breed}</div>
           <div class="coyote-list-color"><strong>Type</strong> ${o.color}</div>
      </div>
      </a>
   </div>

`);



const makeUserProfile = templater(o=>`

   <h4>Hello! ${o.name}</h4>
   <div class="profile-head">
      <div class="user-upload-image">
         <img src="${o.img}" alt="">
      </div>
   </div>
   <h5><img src="img/map-pin.svg" class="icon">${o.location}</h5>

`);

const makeAnimalProfile = templater(o=>`

   <div class="display-flex">
      <div class="profile-image flex-none">
         <img class="coyote-profile-image" src="${o.img}">
         <div class="form-control">
            <span><a href="#coyote-edit-page"><img src="img/edit.svg" class="icon"></a><span>
            <span><a href="#" class="js-animal-delete" data-id="${o.id}"><img src="img/trash.svg" class="icon"></a></span>
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
            <a href="#coyote-profile-page" class="form-button-primary js-animal-jump" data-id="${o.id}">Visit</a>
         </div>
      </div>
   </div>
`);



const makeUserEditForm = (o) => {

return `
   <form id="user-edit-form">
      <div class="form-control">
         <div class="user-upload-image">
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
         <a href="#coyote-profile-page" class="form-button-primary js-animal-edit">Save</a>
      </div>
   </form>
`;
}



const drawAnimalList = (a,empty_phrase='You do not have any coyote list. Go ahead and add some!') => {
   $("#list-page .coyote-list")
      .html(a.length?makeAnimalList(a):empty_phrase);
}


const filterList = (animals,breed) => {
   let a = [...(new Set(animals.map(o=>o[breed])))];
   return templater(o=>`<div class="filter" data-field="${breed}" data-value="${o}">${o[0].toUpperCase()+o.substr(1)}</div>`)(a);
}

const makeFilterList = (animals) => {
   return `
   <div class="filter" data-field="type" data-value="all">All</div> | 
   ${filterList(animals,'breed')} | 
   ${filterList(animals,'color')} 
   `;
}


const makeUploaderImage = (el, name, folder='') => {

   $(el).parent().css({'background-image':`url(${folder+name}`}).addClass('picked')
      .prev().val(folder+name);
}

const makeAddAnimalChoice = async(selection) => {
   let d = await query({
      type:'animals_by_user_id',
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