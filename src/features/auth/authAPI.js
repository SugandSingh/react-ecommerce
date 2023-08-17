// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const res = await fetch("http://localhost:8080/users?email=" + email);
    const data = await res.json();
    if (data.length) {
      if (data[0].password === loginInfo.password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "Invaild credentilas" });
      }
    } else {
      reject({ message: "user not found" });
    }
  });
}
export function updateUser(updateUser) {
  return new Promise(async (resolve) => {
    console.log("====================================");
    console.log("updateUser2", updateUser);
    console.log("====================================");
    const res = await fetch("http://localhost:8080/users/" + updateUser.id, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
export function singOut(userID) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
