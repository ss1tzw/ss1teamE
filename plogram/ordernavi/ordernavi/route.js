import uidget from "./authuidget.js";
import logincheck from "./authlogincheck.js";
const inbtn = document.getElementById("inbtn");
const debtn = document.getElementById("delete");
const savebtn = document.getElementById("save");
const names = document.getElementById("names");
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

    // This event listener will call addMarker() when the map is clicked.
    map.addListener("click", (event) => {
        addMarker(event.latLng);
        latList.push(event.latLng.lat());
        lngList.push(event.latLng.lng());
        counter++;
    });
};

function addMarker(location) {
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
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
    latList.length = 0;
    lngList.length = 0;
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
    names.innerHTML = "";
    counter = 1;
}

//DOM
const Addpoint = () => {
    names.innerHTML = "";
    for (let i = 1; i <= lngList.length; i++) {
        const input = document.createElement("input");
        const br = document.createElement("br");
        const atag = document.createElement("a");
        input.id = i;
        input.value = "ルート" + i;
        atag.innerText = i;
        names.appendChild(atag);
        names.appendChild(input);
        names.appendChild(br);
    }
};

//Ajax
const save = () => {
    const name = document.getElementById("routename").value;
    if (name !== "" && latList.length !== 0) {
        const nameList = [];
        for (let i = 1; i <= lngList.length; i++) {
            nameList.push(document.getElementById(i).value);
        }
        Routefetch(nameList);
    } else {
        alert("ルート名が設定されていないかピンが存在しません");
    }
};

const Routefetch = async(nameList) => {
    const uid = uidget();
    const routeName = document.getElementById("routename").value;
    const body = new FormData();
    body.append("uid", uid);
    body.append("routeName", routeName);
    body.append("nameList", nameList);
    body.append("latList", latList);
    body.append("lngList", lngList);
    const method = "post";
    const filename = "sendRoute.php";
    const res = await fetch(filename, { body, method });
    const users = await res.json();
    console.log(res);
    console.log(users);
};

logincheck("#", "login.html");
locationCheck();
inbtn.addEventListener("click", Addpoint);
savebtn.addEventListener("click", save);
debtn.addEventListener("click", deleteMarkers);