"use strict";

const apiKey = "at_VCqNVMEisJeQK1f3ujGpXyJbBo0lH";
const apiURL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
const map = L.map("map").setView([0, 0], 2);

// add a tile layer to map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// custom marker
const customIcon = L.icon({
  iconUrl: "images/icon-location.svg", // Adjust the path as necessary
  iconSize: [30, 40], // Size of the icon
  iconAnchor: [15, 40], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
});

//  updates information on fetching data from api
function updateInfo(data) {
  document.getElementById("ip-address").textContent = data.ip;
  document.getElementById(
    "location"
  ).textContent = `${data.location.region}, ${data.location.city} ${data.location.postalCode}`;

  document.getElementById(
    "timezone"
  ).textContent = `UTC ${data.location.timezone}`;
  document.getElementById("isp").textContent = data.isp;
  //  update the map location
  const lat = data.location.lat;
  const lng = data.location.lng;
  map.setView([lat, lng], 13);

  // add a marker to the map
  L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(
      `<b>Location: </b>${data.location.city}, ${data.location.region} <br><b>IP: </b> ${data.ip}`
    )
    .openPopup();
}

//function to make a get request to api
function fetchInfo(query) {
  const searchURL = `${apiURL}&ipAddress=${query}&domain=${query}`;
  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      updateInfo(data);
    })
    .catch((error) => {
      console.error("Error fetching IP data: ", error);
    });
}
//click event to get the IP address from search bar
document.getElementById("searchbutton").addEventListener("click", () => {
  const query = document.getElementById("search-input").value;
  fetchInfo(query);
});
fetchInfo("");
