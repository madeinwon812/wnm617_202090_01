
// PROMISES
const query = (options) => {
   // Fetch is a Promise
   return fetch('data/api.php',{
      method:'POST',
      body:JSON.stringify(options),
      headers:{'Content-Type':'application/json'}
   }).then(d=>d.json())
}

const upload = (file) => {
   
   let fd = new FormData();
   fd.append("image",file);

   return fetch('data/api.php',{
      method:'POST',
      body: fd
   }).then(d=>d.json());
}

// CURRIED FUNCTION the function makes other functions
const templater = f => a =>
   (Array.isArray(a)?a:[a])
   .reduce((r,o,i,a)=>r+f(o,i,a),'');


const checkData = (exterior_check) => new Promise((resolve,reject)=>{
   let timeout = 0;
   const interior_check = () => {
      timeout++; if(timeout>10) return reject();
      return exterior_check() ? resolve() : setTimeout(interior_check,10)
   }
   interior_check();
})