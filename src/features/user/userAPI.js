export function fetchLoggedInUserOrder(userID) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/orders/?user.id=" + userID);
    const data = await res.json();

    resolve({ data });
  });
}
export function fetchLoggedInUser(userID) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/users/" + userID);
    const data = await res.json();

    resolve({ data });
  });
}
export function updateUser(updateUser) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/users/" + updateUser.id, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
