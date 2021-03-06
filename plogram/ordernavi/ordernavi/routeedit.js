import logincheck from "./authlogincheck.js";
import logout from "./authlogout.js";
import { updateRoute, getmyRoutename, getRoute, deleteRoute } from "./ajax.js";
const resetbtn = document.getElementById("reset");
const savebtn = document.getElementById("save");
const names = document.getElementById("names");
const logoutbutton = document.getElementById("outbutton");
const setbtn = document.getElementById("routeset");
const deletebtn = document.getElementById("delete");
const routeid = document.getElementById("routeid");
const latList = [];
const lngList = [];
const nameList = [];
let map;
let markers = [];
let counter = 1;
let setCheck = false;
let selectValue;
let id;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var mode;
var latitude = null;
var longitude = null;

//現在位置
const locationCheck = () => {
  //使えるか確認
  if (navigator.geolocation) {
    locationGet();
  }
};

const locationGet = () => {
  //現在地を取得
  navigator.geolocation.getCurrentPosition(createMap);
};

//googlemaps
const createMap = (postion) => {
  const latlng = {
    lat: postion.coords.latitude,
    lng: postion.coords.longitude,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: latlng,
    //追加
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
    },
    //ここまで
  });

  //追加
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setOptions({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: "#ffa500",
    },
  });
  directionsDisplay.setMap(map);
  //ここまで

  const input = document.getElementById("search");
  const button = document.getElementById("nowlocation");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.LEFT].push(input);
  map.controls[google.maps.ControlPosition.LEFT].push(button);
  //検索機能
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        return;
      }
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // マップをクリックした時の処理
  map.addListener("click", (event) => {
    if (setCheck) {
      addMarker(event.latLng);
      latList.push(event.latLng.lat());
      lngList.push(event.latLng.lng());
      ////ここでli要素を追加
      addText();
      counter++;
      calcRoute();
    } else {
      alert("ルートを決定してください");
    }
  });

  button.addEventListener("click", () => {
    changeNowlocation();
  });
};

const addMarker = (location) => {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    animation: google.maps.Animation.DROP,
    icon: {
      fillColor: "#FFA500", //塗り潰し色
      fillOpacity: 0.8, //塗り潰し透過率
      path: google.maps.SymbolPath.CIRCLE, //円を指定
      scale: 16, //円のサイズ
      strokeColor: "#FFA500", //枠の色
      strokeWeight: 1.0, //枠の透過率
    },
    label: {
      text: String(counter), //ラベル文字
      color: "#FFFFFF", //文字の色
      fontSize: "20px", //文字のサイズ
    },
  });
  markers.push(marker);
};

// Sets the map on all markers in the array.
const setMapOnAll = (map) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
};

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = () => {
  setMapOnAll(null);
  latList.length = 0;
  lngList.length = 0;
  nameList.length = 0;
  names.innerHTML = "";
  counter = 1;
};

// Deletes all markers in the array by removing references to them.
const deleteMarkers = () => {
  clearMarkers();
  markers = [];
  names.innerHTML = "";

  counter = 1;
  //追加
  directionsDisplay.set("directions", null);
  //ここまで
};

//DOM
const addText = () => {
  const input = document.createElement("input");
  const br = document.createElement("br");
  const atag = document.createElement("a");
  input.id = counter;
  if (counter > nameList.length) {
    input.value = "ルート" + counter;
  } else {
    input.value = nameList[counter - 1];
  }
  atag.innerText = counter;
  names.appendChild(atag);
  names.appendChild(input);
  names.appendChild(br);
};

async function inselect() {
  const select = document.getElementById("select");
  select.innerHTML = "";
  const routeNameList = await getmyRoutename();
  if (routeNameList !== "") {
    routeNameList.forEach((element) => {
      const option = document.createElement("option");
      option.innerText = element.routename;
      select.appendChild(option);
    });
  } else {
    alert("ルートが存在していません");
    location.href = "routeset.html";
  }
}

const firstSet = async () => {
  await stopTime();
  inselect();
};

const stopTime = async () => {
  const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await _sleep(3000);
};

const deleteCheck = () => {
  if (selectValue !== undefined && selectValue !== "") {
    const check = window.confirm("ルートを削除しますか?");
    if (check) {
      deleteRoute(selectValue);
      deleteMarkers();
      directionsDisplay.set("directions", null);
      selectValue = "";
    }
    inselect();
  } else {
    alert("ルートを決定してください");
  }
};

const changeNowlocation = () => {
  navigator.geolocation.getCurrentPosition((postion) => {
    map.panTo(
      new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude)
    );
  });
};

const routeSet = async () => {
  selectValue = document.getElementById("select").value;
  setCheck = true;
  const routelist = await getRoute(selectValue);
  listIn(routelist);
};

const listIn = (routelist) => {
  id = routelist[0].id;
  routeid.innerHTML = id;
  clearMarkers();
  //id表示
  routelist.forEach((element) => {
    latList.push(Number(element.lat));
    lngList.push(Number(element.lng));
    nameList.push(element.pinname);
    const latLng = new google.maps.LatLng(element.lat, element.lng);
    addMarker(latLng);
    addText();
    counter++;
  });
  const lastLatlng = new google.maps.LatLng(
    latList.slice(-1)[0],
    lngList.slice(-1)[0]
  );
  map.panTo(lastLatlng);
  //追加
  calcRoute();
  //ここまで
};

//追加
function calcRoute() {
  //追加
  directionsDisplay.set(map);
  //ここまで

  // var start = document.getElementById('start').value;
  var start = new google.maps.LatLng(latitude, longitude);

  var waypts = [];

  //var end = document.getElementById('end').value;
  var end = new google.maps.LatLng(
    latList[latList.length - 1],
    lngList[lngList.length - 1]
  );

  //var waypoints = []; // init an empty waypoints array
  //check list from listbox(?)

  for (var i = 0; i < latList.length - 1; i++) {
    waypts.push({
      location: new google.maps.LatLng(latList[i], lngList[i]),
      stopover: true,
    });
  }
  var obj = document.getElementById("mode");
  var idx = obj.selectedIndex; //インデックス番号を取得
  switch (obj.options[idx].value) {
    case "driving":
      mode = google.maps.DirectionsTravelMode.DRIVING;
      break;
    case "bicycling":
      mode = google.maps.DirectionsTravelMode.BICYCLING;
      break;
    case "walking":
      mode = google.maps.DirectionsTravelMode.WALKING;
      break;
  }
  var request = {
    origin: start,
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: mode,
  };
  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
    } else {
    }
  });
}
//ここまで

const save = () => {
  if (selectValue !== undefined && selectValue !== "") {
    nameList.length = 0;
    for (let i = 1; i <= lngList.length; i++) {
      nameList.push(document.getElementById(i).value);
    }
    updateRoute(selectValue, nameList, latList, lngList, id);
  } else {
    alert("ルートを設定してください");
  }
};

logincheck("#", "login.html");
locationCheck();
firstSet();
savebtn.addEventListener("click", save);
resetbtn.addEventListener("click", deleteMarkers);
logoutbutton.addEventListener("click", logout);
setbtn.addEventListener("click", routeSet);
deletebtn.addEventListener("click", deleteCheck);
