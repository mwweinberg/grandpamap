mapboxgl.accessToken = 'pk.eyJ1IjoibXdlaW5iZXJnIiwiYSI6ImNqZ2I5azJtNTJlemYyd215ZTV3bXBmcWoifQ.Rd-1dcf3z9asEQqbu1MxOw'; // replace this with your access token
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mweinberg/ck1f4kq2t0m2b1cqrjvrsv7pj', // replace this with your style URL
  center: [-87.661557, 41.893748],
  zoom: 2
});
// code from the next step will go here
/*map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['grandpascan-1'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    //this is pulling from the geoJson ("Year" and "Location")
    .setHTML('<img class="preview" src =".' + feature.properties.Preview + '">' +      '<h3>' + feature.properties.Year + '</h3><p>' + feature.properties.Location + '</p>' + '<p>' + '<a href=".' + feature.properties.Document + '" target="_blank">Click here</a> for a pdf.' + '</p>')
    .addTo(map);
});*/

//loads and parses the data
map.on('load', function() {
  map.addLayer({
    id: 'year',
    type: 'circle',
    source: {
      type: 'geojson',
      data: './grandpascan.geojson' // replace this with the url of your own geojson
    },
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'Pages']],
        0, 4,
        5, 24
      ],
      'circle-color': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'Pages']],
        0, '#2DC4B2',
        1, '#3BB3C3',
        2, '#669EC4',
        3, '#8B88B6',
        4, '#A2719B',
        5, '#AA5E79'
      ],
      'circle-opacity': 0.8
  },
  filter: ['==', ['number', ['get', 'Year']], 1943]
    });

    //controls the slider
    document.getElementById('slider').addEventListener('input', function(e) {
        var year = parseInt(e.target.value);
        console.log(year)
        // update the map
        map.setFilter('year', ['==', ['number', ['get', 'Year']], year]);

          // update text in the UI
          //document.getElementById('active-hour').innerText = year;
    });

});

