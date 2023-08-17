

// A mock function to mimic making an async request for data
export function addCart(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
export function fetchItemById(userId) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart?userId=" + userId);
    const data = await res.json();
    resolve({ data });
  });
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
export function deleteCartItem(userID) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/cart/" + userID, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
export function resetCart(userID) {
  return new Promise(async (resolve) => {
    const response = await fetchItemById(userID);
    const items = response.data;
    for (let item of items) {
      await deleteCartItem(item.id);
    }
    resolve({ status: 'success' });
  });
}