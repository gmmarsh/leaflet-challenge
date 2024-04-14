// fetch GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  createFeatures(data.features);
});

// initialize the map
var map = L.map('map').setView([37.8, -96], 4);

// tile layer that will be the background of the map
var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map)

// earthquake marker
function createFeatures(earthquakeData) {
    earthquakeData.forEach((feature) => {
        var lat = feature.geometry.coordinates[1];
        var lon = feature.geometry.coordinates[0];
        var mag = feature.properties.mag;
        var place = feature.properties.place;
        var time = new Date(feature.properties.time)    

        var circle = L.circle([lat, lon], {
            color: "black",
            weight: 1,
            fillColor: getColor(mag),
            fillOpacity: 0.8,
            radius: mag * 15000
        }).bindPopup(`<h3>${place}</h3><hr><p>${new Date(time)}</p>`).addTo(map);
    });
}