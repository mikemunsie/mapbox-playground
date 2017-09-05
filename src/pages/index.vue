<template>
  <div>
    <div id="mapbox"></div>
    <div class="rightColumn">
      <h1>Mapbox Testing</h1>
      <div class="mapboxStyles">
        <div class="mapboxStyles--input">
          <input
            id="dark-radio"
            type="radio"
            value="dark"
            v-model="stylePicked"
            v-on:change="changeMapStyle('dark')"
          />
          <label for="dark-radio">Dark</label>
        </div>
        <div class="mapboxStyles--input">
          <input
            id="satellite-radio"
            type="radio"
            value="satellite"
            v-model="stylePicked"
            v-on:change="changeMapStyle('satellite')"
          />
          <label for="satellite-radio">Satellite</label>
        </div>
        <div class="mapboxStyles--input">
          <input
            id="satellite-streets"
            type="radio"
            value="streets"
            v-model="stylePicked"
            v-on:change="changeMapStyle('streets')"
          />
          <label for="satellite-streets">Streets</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import addPlaces from '../helpers/addPlaces';
//import addIcon from '../helpers/addIcon';
//import addCluster from '../helpers/addCluster';
//import addHeatmap from '../helpers/addHeatmap';
//import animateLine from '../helpers/animateLine';
import addLayers from '../helpers/addLayers';

let map;

export default {
  name: 'hello',
  data: function() {
    return {
      stylePicked: ''
    }
  },
  methods: {
    changeMapStyle(style) {
      this.stylePicked = style;
      map.setStyle('mapbox://styles/mapbox/' + style + '-v9');
    }
  },
  mounted() {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVuc3Ryb2NpdHkiLCJhIjoiY2o3MHVsNjl4MDJyMDMzbW5mdzI5cnFzZyJ9.XGzBFMwcp0fTAEXcSl5AAQ';

    map = new mapboxgl.Map({
      container: 'mapbox',
      center: [-77.04, 38.907],
      zoom: 11.15,
      style: 'mapbox://styles/mapbox/light-v9'
    });

    let canvas;
    const mapboxProps = { map, mapboxgl };
    const geojson = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": [[0,0]]
        }
      }]
    };

    map.on('load', function () {
      canvas = map.getCanvasContainer();

      //addPlaces(mapboxProps);
      //addIcons(mapboxProps);
      // addCluster(mapboxProps);
      //addHeatmap(mapboxProps);
      //animateLine(mapboxProps);
      //addLayers(mapboxProps);

      // add the line which will be modified in the animation
      map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': '#ed6498',
          'line-width': 5,
          'line-opacity': .8
        }
      });

      // Goal: User clicks on the map, adds a point, animates to the next point (should be easy?)
      animateLine();
      function animateLine(timestamp) {
        map.getSource('line-animation').setData(geojson);
        requestAnimationFrame(animateLine);
      }


      canvas.addEventListener('mousedown', disableDrag, true);
      window.addEventListener('keydown', changeCursor, true);
      window.addEventListener('keyup', changeCursor, true);


    });

    let firstClick = true;


    const changeCursor = (e) => {
       if (!(e.shiftKey)) {
        canvas.style.cursor = 'pointer';
        return;
      }
      console.log('lets roll')
      canvas.style.cursor = 'crosshair';
    }

    // Disable drag while shift is down
    const disableDrag = (e) => {
      if (!(e.shiftKey && e.button === 0)) {
        map.boxZoom.enable();
        map.dragPan.enable();
        return;
      }

      canvas.style.cursor = 'crosshair';
      map.boxZoom.disable();
      map.dragPan.disable();
    }

    map.on('mousedown', function(info) {
      const { lngLat } = info;

      const e = info.originalEvent;

      // If it's not the shift button, escape
      if (!(e.shiftKey && e.button === 0)) return;

      if (firstClick) {
        geojson.features[0].geometry.coordinates[0] = [lngLat.lng, lngLat.lat];
        firstClick = false;
      } else {
        geojson.features[0].geometry.coordinates.push([lngLat.lng, lngLat.lat]);
      }
      e.stopPropagation();
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url('https://api.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css');

h1 {
  font-size: 20px;
}

.mapboxStyles {
  margin-top: 30px;
  border: 1px solid #666;
  border-left: 0;
  border-right: 0;
  padding: 15px;
  text-align: left;
  input {
    margin-bottom: 7.5px;
  }
}

#mapbox {
  position: fixed;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  .mapboxgl-canvas {
    left: 0;
  }
}

.rightColumn {
  width: 20%;
  position: fixed;
  top: 0;
  right: 0;
  color: #fff;
  margin-top: 15px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
