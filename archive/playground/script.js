//https://docs.mapbox.com/help/tutorials/show-changes-over-time/

mapboxgl.accessToken = 'pk.eyJ1IjoibXdlaW5iZXJnIiwiYSI6ImNqZ2I5azJtNTJlemYyd215ZTV3bXBmcWoifQ.Rd-1dcf3z9asEQqbu1MxOw';


//creates the map
var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-74.0059, 40.7128], // initial map center in [lon, lat]
  zoom: 2
});

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
          document.getElementById('active-year').innerText = year;
    });

    //controls the radio buttons

    document.getElementById('filters').addEventListener('change', function(e) {
      var month = e.target.value;
      // update the map filter
      if (month === 'all') {
        filterDay = ['match', ['get', 'Month'], [1,2,3,4,5, 6,7,8,9,10,11,12], true, false];;
    } else if (month === 'summer') {
        filterDay = ['match', ['get', 'Month'], [1,2,3,10,11,12], false, true];
    } else if (month === 'winter') {
        filterDay = ['match', ['get', 'Month'], [1,2,3,10,11,12], true, false];
      } else {
        console.log('error');
      }
      map.setFilter('year', ['all', filterDay]);
    });

    map.on('click', 'year', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
        var feature = e.features[0];

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //controls the popups when you click on a thing
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            //.setHTML(description)
            .setHTML('<img class="preview" width = "100" src =".' + feature.properties.PreviewLocation + '">' +      '<h3>' + feature.properties.Year + '</h3><p>' + feature.properties.LocationName + '</p>' + '<p>' + '<a href=".' + feature.properties.DocumentLocation + '" target="_blank">Click here</a> for a pdf.' + '</p>')
            .addTo(map);
        });
});


