//similar as  lecture 10-Stu_Geo-Json
let usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

d3.json(usgsUrl, function(data) {

  createFeatures(data.features);
});

function createFeatures(earthquakeInfo) {

    let earthquakes = L.geoJSON(earthquakeInfo, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        let color;
        let r = 250;
        let g = Math.floor(r-50*feature.properties.mag);
        let b = Math.floor(r-50*feature.properties.mag);
        color= "rgb("+r+" ,"+g+","+ b+")"
        
        let markerOptions = {
          
          fillColor: color,
          color: "white",
          weight: 1.5,
          fillOpacity: 0.75,
          opacity: 0.8,
          radius: 5*feature.properties.mag
          
        };
        return L.circleMarker(latlng, markerOptions);
      }
    });
 
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + "Magnitude: " + feature.properties.mag + "</h3><p>" + feature.properties.place + "</p>");
  }
    createMap(earthquakes);
  }
  

  function createMap(earthquakes) {

    let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 10,
      id: "mapbox.light",
      accessToken: "pk.eyJ1IjoibWFyc2hhdiIsImEiOiJjazd6Y3I3cXQwNDh1M2tybGs3eDEwbzRuIn0.qvF35_fYHd8ZTq3dpth3sQ"
    });
    // pisos
    let baseLayer = {
      "Land Map": lightmap
    };

    let overlayLayer = {
      Earthquakes: earthquakes
    };
  
    let myMap = L.map("map", {
      center: [39.50, -98.35],
      zoom: 4,
      layers: [lightmap, earthquakes]
    });

    L.control.layers(baseLayer, overlayLayer).addTo(myMap);

}