import earthquakeData from '../mocks/earthquakes.json';

export default ({ map }) => {

  // Add a new source from our GeoJSON data and set the
  // 'cluster' option to true.
  map.addSource("earthquakes", {
      type: "geojson",
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: earthquakeData,
      cluster: true,
      clusterMaxZoom: 15, // Max zoom to cluster points on
      clusterRadius: 20 // Use small cluster radius for the heatmap look
  });

  // Use the earthquakes source to create four layers:
  // three for each cluster category, and one for unclustered points

  // Each point range gets a different fill color.
  var layers = [
      [0, 'green'],
      [20, 'orange'],
      [200, 'red']
  ];

  layers.forEach(function (layer, i) {
      map.addLayer({
          "id": "cluster-" + i,
          "type": "circle",
          "source": "earthquakes",
          "paint": {
              "circle-color": layer[1],
              "circle-radius": 70,
              "circle-blur": 1 // blur the circles to get a heatmap look
          },
          "filter": i === layers.length - 1 ?
              [">=", "point_count", layer[0]] :
              ["all",
                  [">=", "point_count", layer[0]],
                  ["<", "point_count", layers[i + 1][0]]]
      }, 'waterway-label');
  });

  map.addLayer({
      "id": "unclustered-points",
      "type": "circle",
      "source": "earthquakes",
      "paint": {
          "circle-color": 'rgba(0,255,0,0.5)',
          "circle-radius": 20,
          "circle-blur": 1
      },
      "filter": ["!=", "cluster", true]
  }, 'waterway-label');

}