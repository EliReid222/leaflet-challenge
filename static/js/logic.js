const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Map Setup
const myMap = L.map("map", {
    center: [35.4, -119.4],
    zoom: 6.5
  });
  
  // Tile layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(myMap);
  
  function getColor(depth) {
            switch (true) {
              case depth > 90:
                return "#E99000d";
              case depth > 70:
                return "#3f3b2c";
              case depth > 50:
                return "#2ca25f";
              case depth > 30:
                return "#f330d2";
              case depth > 10:
                return "#fff5f0";
              default:
                return "#98EE00";
            }     
}
  
  // Earthquake Stats
  d3.json(url).then(function(data) {
     const features = data.features;
  
  
  
     //  Circle creation
     for (let i = 0; i < features.length; i++) {
      // Searching for null or naan magnitude
      if (features[i].properties.mag === null || isNaN(features[i].properties.mag) || features[i].properties.mag < 0.001) {
        continue;
      }
      const geometry = features[i].geometry;
      const properties = features[i].properties;
      const depth = geometry.coordinates[2];
      const magnitude = properties.mag;
      //  Date setup 
      const date = new Date(properties.time).toLocaleDateString("en-US");
      const eventURL = properties.url;
  
      // Add circles to map
      L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
        fillOpacity: 0.2,
        color: "green",
        weight: 0.5,
        fillColor: getColor(depth),
        radius: magnitude * 15000 * 0.5
      }).bindPopup(`<h1>${properties.place}</h1> <hr> <h3>Magnitude: ${magnitude}</h3> <h4>Date: ${date}</h4> <a href="${eventURL}" target="_blank">Event Details</a>`).addTo(myMap);
    }
  
    function style(feature) {
        const depth = feature.geometry.coordinates[2];
        return {
            fillColor: "white",
            weight: 0.4,
            opacity: 1,
            color: "black",
            fillOpacity: 0.7
        };
    }

      // Click Event creation
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        layer.bringToFront();
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    } 
    var geojson;
// ... our listeners

    function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
}
    function onEachFeature(features, layer) {
    layer.on({
        mouseover: zoomToFeature,
        mouseout: resetHighlight,
        click: highlightFeature
    });
    geojson = L.geoJson(features, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(myMap);  
}
  });
  
// Legend
const legend = L.control({ position: 'bottomleft' });

legend.onAdd = function (myMap) {
    const div = L.DomUtil.create('div', 'info legend');
    const depths = [6, 5.5, 5, 4, 1];
    const colors = ['#E99000', '#3f3b2c', '#2ca25f', '#f330d2', '#fff5f0'];

    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<div style="display: flex; align-items: center;">' +
            '<i style="background:' + colors[i] + '; width: 25px; height: 15px;"></i> ' +
            'Magnitude ' + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] : '+') +
            '</div>';
    }


    return div;
};
legend.addTo(myMap);
