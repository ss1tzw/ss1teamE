import logincheck from "./authlogincheck.js";
import logout from "./authlogout.js";
import {checkId,getAllidRoute,gethostidroute,} from "./ajax.js"
const logoutbutton = document.getElementById("outbutton");
const idbtn = document.getElementById("idbtn")
let map;
let markers = [];
let infos = [];
let id;
const idget = async() => {
   id = document.getElementById("idText").value
  if(id === ""){
      alert("IDを入力してください")
      return
  }
  const result = await checkId(id)
  if(result === ""){
      alert("存在していないIDです")
      return
    }
    routeNameSet(result[0].routename)
    
  routeGet();
}
const routeNameSet = (routename) => {
    const routeText = document.getElementById("routename")
    routeText.innerHTML = routename;
}

const routeGet = async() => {
    const hostroute = await gethostidroute(id)
    const route = await getAllidRoute(id)
    setMap(hostroute,route)
}
const setMap = (hostroutelist,routelist) => {
    let lastTime;
    console.log(routelist)
    clearMarkers();
    let counter = 1;
    let color = "#ffa500"
    hostroutelist.forEach((element) => {
        const latLng = new google.maps.LatLng(element.lat, element.lng);
        createMarker(latLng,counter,color,element.pinname);
        console.log(counter)
        counter++;
    });
    counter = 1;
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    routelist.forEach((element)=>{
        const latLng = new google.maps.LatLng(element.lat, element.lng);
        console.log(counter)
        if(counter === 1){
            lastTime = element.uid
        }
        if(lastTime === element.uid){
            createMarker(latLng,counter,color,element.pinname)
            counter++;
        }else{
            counter = 1;
            color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            createMarker(latLng,counter,color,element.pinname)
        }
    })
};
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
            position: google.maps.ControlPosition.TOP_LEFT
        },
        //ここまで
    });
    //地図上に配置
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
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    button.addEventListener("click", () => {
        changeNowlocation();
    });
};
const createMarker = (location,counter,color,pinname) => {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: {
            fillColor: color, //塗り潰し色
            fillOpacity: 0.8, //塗り潰し透過率
            path: google.maps.SymbolPath.CIRCLE, //円を指定
            scale: 16, //円のサイズ
            strokeColor: "#fffff", //枠の色
            strokeWeight: 1.0, //枠の透過率
        },
        label: {
            text: String(counter), //ラベル文字
            color: "#FFFFFF", //文字の色
            fontSize: "20px", //文字のサイズ
        },        
    });
    const infowindow = new google.maps.InfoWindow({
        content: pinname,
      });
    marker.addListener("click", ()=>{
        infowindow.open(map,marker)
    });
    markers.push(marker);
};

const setMapOnAll = (map) => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};

const clearMarkers = () => {
    setMapOnAll(null);
    markers.length = 0
    infos.length = 0
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
idbtn.addEventListener("click",idget)
logoutbutton.addEventListener("click", logout);