

// Users Template

[
  '{{repeat(10)}}',
  {
    id: '{{index(1)}}',
    name: '{{firstName()}} {{surname()}}',
    username: function() {
      return 'user'+this.id;
    },
    email: function() {
      return this.username+'@gmail.com';
    },
    password: 'md5(\'pass\')',
    date_create: 'NOW()',
    address: '{{city()}}, {{state()}}',
    img: function(tags) {
      return 'https://via.placeholder.com/400/'+
        tags.integer(700,999)+'/fff/?text='+
        this.username;
    }
  }
]


// Coyotes Template

[
  '{{repeat(50)}}',
  {
    id: '{{index(1)}}',
    user_id: '{{integer(1,10)}}',
    name: '{{firstName()}}',
    breed: '{{random("Western Coyote","Central U.S. Coyote", "Eastern Coyote", "Central American Coyote", "Mexican Coyote", "Salvador Coyote", "Belize Coyote", "Honduras Coyote", "Southeastern Coyote")}}',
    years: '{{integer(1, 10)}}',
    months: '{{integer(1, 12)}}',
    color: '{{random("Black", "White", "Dark Gray", "Light tan", "Dark tan","Light tan")}}',
    gender: '{{random("Female", "Male")}}',
    img: function(tags) {
      return 'https://via.placeholder.com/400/' +
        tags.integer(700,999) + '/fff/?text=' +
        this.name;
    },
    description: '{{lorem(2,"sentences")}}',
    data_create: 'NOW()'
  }
]



// Locations Template

[
  '{{repeat(150)}}',
  {
    id: '{{index(1)}}',
    aid: '{{integer(1,50)}}',
    
    lat: '{{floating(37.801301,37.699383)}}',
    lng: '{{floating(-122.505278,-122.371732)}}',
    
    description: '{{lorem(2,"sentences")}}',
    photo: 'http://madeinwon.com/aau/wnm617/jiwon.lee/img/location-image.jpg',
    icon: 'http://madeinwon.com/aau/wnm617/jiwon.lee/img/map-pin.svg',
    
    date_create: 'NOW()'
  }
]



// JSON-GENERATOR Original Template

[
  '{{repeat(5, 7)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
    picture: 'http://placehold.it/32x32',
    age: '{{integer(20, 40)}}',
    eyeColor: '{{random("blue", "brown", "green")}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    company: '{{company().toUpperCase()}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    about: '{{lorem(1, "paragraphs")}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    latitude: '{{floating(-90.000001, 90)}}',
    longitude: '{{floating(-180.000001, 180)}}',
    tags: [
      '{{repeat(7)}}',
      '{{lorem(1, "words")}}'
    ],
    friends: [
      '{{repeat(3)}}',
      {
        id: '{{index()}}',
        name: '{{firstName()}} {{surname()}}'
      }
    ],
    greeting: function (tags) {
      return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
    },
    favoriteFruit: function (tags) {
      var fruits = ['apple', 'banana', 'strawberry'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }
  }
]