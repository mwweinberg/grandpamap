//https://maptimeboston.github.io/leaflet-intro/

// initialize the map
//set center and zoom level
var map = L.map('map').setView([30, -30], 3);

// load a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 17,
    minZoom: 1
  }).addTo(map);

//load the geojson using jquery
$.getJSON("./data/grandpascan.geojson",function(data){
    //add the icon
    var planeIcon = L.icon({
        iconUrl: './data/icons/bomber.png',
        iconSize: [25, 25]
    });
   // add GeoJSON layer to the map once the file is loaded
   var letters = L.geoJson(data , {
       //including the icon
       pointToLayer: function(feature, latlng){
           //variable to hold the marker
           var marker = L.marker(latlng, {icon:planeIcon});
           //content of the marker popup
           marker.bindPopup('<img class="preview" width = "100" src =".' + feature.properties.PreviewLocation + '">' +      '<h3>' + feature.properties.Month + "/" + feature.properties.Year + '</h3><p>' + feature.properties.LocationName + '</p>' + '<p>' + feature.properties.Pages + ' pages</p>' + '<p>' + '<a href=".' + feature.properties.DocumentLocation + '" target="_blank">Click here</a> for a pdf.' + '</p>');
           return marker;


       }



   }   );


   //cluster plugin stuff
   var clusters = L.markerClusterGroup({className: 'marker-cluster'});
   clusters.addLayer(letters);
   map.addLayer(clusters);




 });





