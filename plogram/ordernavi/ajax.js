import uidget from "./authuidget.js";

export const getRoutename = async () => {
  const uid = uidget();
  console.log(uid);
  const body = new FormData();
  body.append("uid", uid);
  const method = "post";
  const filename = "getRoutename.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  console.log(res);
  console.log(users);
  return users;
};

export const setRoute = async (routeName, nameList, latList, lngList) => {
  const uid = uidget();
  console.log(uid);
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

export const updateRoute = async (routeName, nameList, latList, lngList) => {
  const uid = uidget();
  console.log(uid);
  console.log(nameList);
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  body.append("nameList", nameList);
  body.append("latList", latList);
  body.append("lngList", lngList);
  const method = "post";
  const filename = "updateRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  console.log(res);
  console.log(users);
};

export const getRoute = async (routeName) => {
  console.log(routeName);
  const uid = uidget();
  console.log(uid);
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  const method = "post";
  const filename = "getRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  console.log(res);
  console.log(users);
  return users;
};

export const deleteRoute = async (routeName) => {
  const uid = uidget();
  console.log(uid);
  const body = new FormData();
  body.append("uid", uid);
  body.append("routeName", routeName);
  const method = "post";
  const filename = "deleteRoute.php";
  const res = await fetch(filename, { body, method });
  const users = await res.json();
  console.log(res);
  console.log(users);
};
