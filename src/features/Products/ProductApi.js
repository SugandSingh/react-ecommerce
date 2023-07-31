// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilters(filter) {
  let queryString = "";
  for (const key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products?"+queryString);
    const data = await res.json();
    resolve({ data });
  });
}
