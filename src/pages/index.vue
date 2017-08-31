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
      style: 'mapbox://styles/mapbox/dark-v9'
    });

    map.on('click', 'places', function (e) {
      new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(e.features[0].properties.description)
        .addTo(map);
    });

    // Add controls to the map
    map.addControl(new mapboxgl.NavigationControl());

    // Change cursor to a pointer when you hover over a place
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });

    // Add a few things onto the map
    map.on('load', function() {
      map.addLayer({
        "id": "places",
        "type": "symbol",
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        },
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {
                "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                "icon": "theatre"
              },
              "geometry": {
                "type": "Point",
                "coordinates": [-77.038659, 38.931567]
              }
            }]
          }
        }
      });
    });
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
