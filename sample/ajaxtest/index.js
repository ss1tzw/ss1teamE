const data = {
    name: "jiro",
    age: 18
}

async function fetchjson() {
    const body = new FormData();
    body.append("name", document.form.textname.value);
    body.append("age", document.form.textage.value);
    for (let value of body.entries()) {
        console.log(value);
    }
    const method = "post";
    const filename = "index.php";
    const res = await fetch(filename, {
        body,
        method
    });
    const users = await res.json();
    console.log(res);
    console.log(users);
}

async function searchjson() {
    const body = new FormData();
    body.append("name", document.form.textname.value);
    for (let value of body.entries()) {
        console.log(value);
    }
    const method = "post";
    const filename = "search.php";
    const res = await fetch(filename, {
        body,
        method
    });
    const users = await res.json();
    console.log(res);
    console.log(users);
}

async function deletejson() {
    const body = new FormData();
    body.append("name", document.form.textname.value);
    for (let value of body.entries()) {
        console.log(value);
    }
    const method = "post";
    const filename = "delete.php";
    const res = await fetch(filename, {
        body,
        method
    });
    const users = await res.json();
    console.log(res);
    console.log(users);
}

//fetchjson();
