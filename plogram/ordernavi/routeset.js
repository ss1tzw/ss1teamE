import logincheck from "./authlogincheck.js";
import logout from "./authlogout.js";
import { getRoutename, setRoute } from "./ajax.js";
const inbtn = document.getElementById("inbtn");
const debtn = document.getElementById("delete");
const savebtn = document.getElementById("save");
const names = document.getElementById("names");
const logoutbutton = document.getElementById("outbutton");
const latList = [];
const lngList = [];
let map;
let markers = [];
let counter = 1;
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
  });

  const input = document.getElementById("search");
  const button = document.getElementById("nowlocation");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);
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
        console.log("Returned place contains no geometry");
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
    addMarker(event.latLng);
    latList.push(event.latLng.lat());
    lngList.push(event.latLng.lng());
    addText();
    counter++;
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
      fillColor: "#FF0000", //塗り潰し色
      fillOpacity: 0.8, //塗り潰し透過率
      path: google.maps.SymbolPath.CIRCLE, //円を指定
      scale: 16, //円のサイズ
      strokeColor: "#FF0000", //枠の色
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
};

// Deletes all markers in the array by removing references to them.
const deleteMarkers = () => {
  clearMarkers();
  markers = [];
  names.innerHTML = "";
  counter = 1;
};

//DOM
const addText = () => {
  const input = document.createElement("input");
  const br = document.createElement("br");
  const atag = document.createElement("a");
  input.id = counter;
  input.value = "ルート" + counter;
  atag.innerText = "";
  names.appendChild(atag);
  names.appendChild(input);
  names.appendChild(br);
};

const save = async () => {
  const routeName = document.getElementById("routename").value;
  const checkList = await checkname();
  console.log(checkList);
  let state;
  if (checkList !== undefined) {
    checkList.forEach((element) => {
      if (element == routeName) {
        state = false;
      }
    });
  }

  if (routeName !== "" && latList.length !== 0 && state !== false) {
    const nameList = [];
    for (let i = 1; i <= lngList.length; i++) {
      nameList.push(document.getElementById(i).value);
    }
    setRoute(routeName, nameList, latList, lngList);
    location.href = "userpage.html";
  } else {
    if (state == false) {
      alert("存在しているルート名です");
    }
    if (routeName == "") {
      alert("ルート名を入力してください");
    }
    if (latList.length == 0) {
      alert("ピンが存在していません");
    }
  }
};

const checkname = async () => {
  const nameElement = await getRoutename();
  const nameList = [];
  if (nameElement !== "") {
    nameElement.forEach((element) => {
      nameList.push(element.routename);
    });
    return nameList;
  }
};
const changeNowlocation = () => {
  navigator.geolocation.getCurrentPosition((postion) => {
    map.panTo(
      new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude)
    );
  });
};

logincheck("#", "login.html");
locationCheck();
savebtn.addEventListener("click", save);
debtn.addEventListener("click", deleteMarkers);
logoutbutton.addEventListener("click", logout);
