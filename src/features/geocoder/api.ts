import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  timeout: 2000,
});

console.log(instance);

// ${event.target.value}.json?access_token=pk.eyJ1Ijoic3RoeW1hIiwiYSI6ImNrcnFycDlzNjFxM3Uydm1vMGNxd200amsifQ.aTXBxeiEvrCesxbO8OuFEg&autocomplete=true
