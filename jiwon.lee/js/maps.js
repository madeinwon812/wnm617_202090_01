
//make map from google map
//target is the page and the div where you want to put the map inside （map_el is target)
const makeMap = async (target) => {

  await checkData(()=>window.google);

  let sf = {lat: 37.786217, lng: -122.399328};
  let map_el = $(target);

  if(!map_el.data("map"))
    map_el.data(
      "map",
      new google.maps.Map(map_el[0], {
            center: sf,
            zoom: 13,
            disableDefaultUI: true,
            styles: mapStyles
      })
    )
    .data(
      "infoWindow",
      new google.maps.InfoWindow({content:''})
      );

  return map_el;
}


const makeMarkers = async (map_el,locs) => {

  let map = map_el.data("map");
  let markers = map_el.data("markers");

  if(markers) markers.forEach(o=>o.setMap(null));

  markers = [];

  locs.forEach((o,i,a)=>{
    let m = new google.maps.Marker({
      position: o,
      map: map,
      icon: {
        url:o.icon,
        scaledSize: {
          width: 40,
          height: 40,
        }
      }
    });
    markers.push(m);
  });

  map_el.data("markers",markers);

  setTimeout(()=>{setMapBounds(map,locs)},100);
}


const setMapBounds = (map,locs) => {
  if(locs.length == 1) {
    map.setCenter(locs[0]);
    map.setZoom(14);
  } else
  if(locs.length == 0) {
    if(window.location.protocol!=="https:") return;
    else {
      navigator.geolocation.getCurrentPosition(p=>{
        let pos = {
          lat:p.coords.latitude,
          lng:p.coords.longitude
        };
        map.setCenter(pos);
        map.setZoom(15);
      },(...args)=>{
        console.log("error?",args);
      },{
        enableHighAccuracy:false,
        timeout:5000,
        maximumAge:0
      })
    }
  } else {
    let bounds = new google.maps.LatLngBounds(null);
    locs.forEach(o=>{
      if(o.lat) bounds.extend(o);
    });
    map.fitBounds(bounds);
  }
}


const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5d7e9e"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e6f3d6"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#f4a8a8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f4f4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eaf6f8"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eaf6f8"
            }
        ]
    }
]