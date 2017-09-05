export default ({ map }) => {

  console.log("Resetting center and zoom position...");

  map.setCenter([-71.97722138410576, -13.517379300798098]);
  map.setZoom(15);

  map.addSource('museums', {
      type: 'vector',
      url: 'mapbox://mapbox.2opop9hr'
  });
  map.addLayer({
      'id': 'museums',
      'type': 'circle',
      'source': 'museums',
      'layout': {
          'visibility': 'visible'
      },
      'paint': {
          'circle-radius': 8,
          'circle-color': 'rgba(55,148,179,1)'
      },
      'source-layer': 'museum-cusco'
  });

  map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
  });
  map.addLayer({
      'id': 'contours',
      'type': 'line',
      'source': 'contours',
      'source-layer': 'contour',
      'layout': {
          'visibility': 'visible',
          'line-join': 'round',
          'line-cap': 'round'
      },
      'paint': {
          'line-color': '#877b59',
          'line-width': 1
      }
  });

};