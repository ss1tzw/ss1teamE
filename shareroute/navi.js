//インサート：ルート名一覧、選択したルート
import logincheck from "./authlogincheck.js";
import { getRoutename, getRoute } from "./ajax.js";
const setbtn = document.getElementById("routeset");
const latList = [];
const lngList = [];
const nameList = [];
let map;

const locationOption = {
  enableHighAccuracy: true,
};
const locationCheck = () => {
  //使えるか確認
  if (!navigator.geolocation) {
    alert("この端末では位置情報が取得できません");
  }
};

const locationGet = () => {
  //現在地を取得
  navigator.geolocation.getCurrentPosition(
    createMap,
    locationGeterr,
    locationOption
  );
};

const locationGeterr = () => {
  alert("位置情報の取得に失敗しました");
};

const createMap = (postion) => {
  const latlng = {
    lat: postion.coords.latitude,
    lng: postion.coords.longitude,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: latlng,
  });

  const button = document.getElementById("nowlocation");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(button);

  // マップをクリックした時の処理
  map.addListener("click", (event) => {});

  button.addEventListener("click", () => {
    changeNowlocation();
  });
};

const changeNowlocation = () => {
  navigator.geolocation.getCurrentPosition((postion) => {
    map.panTo(
      new google.maps.LatLng(postion.coords.latitude, postion.coords.longitude)
    );
  });
};

const firstSet = async () => {
  await stopTime();
  inselect();
};

const stopTime = async () => {
  const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await _sleep(1500);
};

const inselect = async () => {
  const select = document.getElementById("select");
  select.innerHTML = "";
  const routeNameList = await getRoutename();
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
};

const clearMarkers = () => {
  latList.length = 0;
  lngList.length = 0;
  nameList.length = 0;
};

const listIn = (routelist) => {
  clearMarkers();
  routelist.forEach((element) => {
    latList.push(Number(element.lat));
    lngList.push(Number(element.lng));
    nameList.push(element.name);
  });
};

const createRoute = () => {
  navigator.geolocation.getCurrentPosition(
    (postion) => {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      const latlng1 = new google.maps.LatLng(
        postion.coords.latitude,
        postion.coords.longitude
      );
      const latlng2 = new google.maps.LatLng(latList[0], lngList[0]);

      const request = {
        origin: latlng1, // 出発地点の緯度、経度
        destination: latlng2, // 到着地点の緯度、経度
        travelMode: google.maps.DirectionsTravelMode.DRIVING, // ルートの種類
      };
      directionsService.route(request, function (result, status) {
        directionsRenderer.setDirections(result); // 取得したルートをセット
        directionsRenderer.setMap(map); // ルートを地図に表示
      });
    },
    locationGeterr,
    locationOption
  );
};
const routeSet = async () => {
  const selectValue = document.getElementById("select").value;
  const routelist = await getRoute(selectValue);
  listIn(routelist);
  createRoute();
};

logincheck("#", "login.html");
locationCheck();
locationGet();
firstSet();
setbtn.addEventListener("click", routeSet);
