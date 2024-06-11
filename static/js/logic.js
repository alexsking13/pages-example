let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;

// Create the createMap function.
let map = L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel,
});

  // Create the tile layer that will be the background of our map.
  const tileLayer=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  d3.json('https://gbfs.citibikenyc.com/gbfs/en/station_information.json').then(jsonData => {


  const stationsArray = jsonData.data.stations

  const markerArray = stationsArray.map(station => {
    return L.marker([station.lat, station.lon])
      .bindPopup(`<b>${station.name}</b><br>${station.capacity}`)

  })
  var stationMarkerLayer=L.layerGroup(markerArray);    
  stationMarkerLayer.addTo(map);



var baseMaps={
  "OpenStreetMap":tileLayer
};

var overlayMaps={
  "Bike Station":stationMarkerLayer
};

var layerControl=L.control.layers(null,overlayMaps).addTo(map);})
