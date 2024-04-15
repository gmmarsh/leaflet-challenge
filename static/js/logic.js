// initialize the map
let map = L.map('map').setView([37.8, -96], 4);

// tile layer that will be the background of the map
let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map)

// pull the data and print it to the console
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then(data => {
    console.log(data)

    // for loop to create the markers
    let earthquakes = data.features
    for (let i = 0; i < earthquakes.length; i++) {
        let earthquake = earthquakes[i]
        let lat = earthquake.geometry.coordinates[1]
        let lon = earthquake.geometry.coordinates[0]
        let depth = earthquake.geometry.coordinates[2]
        let mag = earthquake.properties.mag
        let place = earthquake.properties.place
        let time = earthquake.properties.time

    // create a circle marker
        let circle = L.circle([lat, lon], {
            color: 'black',
            fillColor: 'red',
            fillOpacity: 0.5,
            radius: mag * 20000
        }).addTo(map)

        // bind a popup to the circle marker
        circle.bindPopup(`<h1>${place}</h1><hr><h3>Magnitude: ${mag}</h3><h3>Time: ${new Date(time)}</h3><h3>Depth: ${depth}</h3>`)

    // markers change color based on depth
        if (depth > 90) {
            circle.setStyle({fillColor: 'red'})
        } else if (depth > 70) {
            circle.setStyle({fillColor: 'orange'})
        } else if (depth > 50) {
            circle.setStyle({fillColor: 'yellow'})
        } else if (depth > 30) {
            circle.setStyle({fillColor: 'green'})
        } else if (depth > 10) {
            circle.setStyle({fillColor: 'blue'})
        } else {
            circle.setStyle({fillColor: 'purple'})
        }
    }
}
)