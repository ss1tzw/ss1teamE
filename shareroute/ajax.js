import { nameget, uidget } from "./authDataget.js";

//アップロード

export const setRoute = async (routeName, nameList, latList, lngList, id) => {
  const uid = uidget();
  const name = nameget();
  console.log(name);
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  body.append("nameList", nameList);
  body.append("latList", latList);
  body.append("lngList", lngList);
  body.append("name", name);
  body.append("id", id);
  const method = "post";
  const filename = "./php/sendRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
};

export const setFriendRoute = async (nameList, latList, lngList, id) => {
  const uid = uidget();
  const name = nameget();
  const body = new FormData();
  body.append("uid", uid);
  body.append("nameList", nameList);
  body.append("latList", latList);
  body.append("lngList", lngList);
  body.append("name", name);
  body.append("id", id);
  const method = "post";
  const filename = "./php/friendrouteset.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
};

export const updateRoute = async (
  routeName,
  nameList,
  latList,
  lngList,
  id
) => {
  const uid = uidget();
  const name = nameget();
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  body.append("pinnameList", nameList);
  body.append("latList", latList);
  body.append("lngList", lngList);
  body.append("name", name);
  body.append("id", id);
  const method = "post";
  const filename = "./php/updateRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
};

//取得
export const getmyRoutename = async () => {
  const uid = uidget();
  const body = new FormData();
  body.append("uid", uid);
  const method = "post";
  const filename = "./php/getmyRoutename.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};

export const checkId = async (id) => {
  const body = new FormData();
  body.append("id", id);
  const method = "post";
  const filename = "./php/checkid.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};

export const getRoute = async (routeName) => {
  const uid = uidget();
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  const method = "post";
  const filename = "./php/getRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};
export const gethostidroute = async (id) => {
  const body = new FormData();
  body.append("id", id);
  const method = "post";
  const filename = "./php/gethostidRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};
export const getmyidRoute = async (id) => {
  const uid = uidget();
  const body = new FormData();
  body.append("uid", uid);
  body.append("id", id);
  const method = "post";
  const filename = "./php/getidRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};

export const getAllidRoute = async (id) => {
  const body = new FormData();
  body.append("id", id);
  const method = "post";
  const filename = "./php/getAllidRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  return users;
};

//削除
export const deleteRoute = async (routeName) => {
  const uid = uidget();
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  const method = "post";
  const filename = "./php/deleteRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
};
