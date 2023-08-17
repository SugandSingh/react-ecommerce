export function addOrder(item) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await res.json();
    resolve({ data });
  });
}
