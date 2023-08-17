// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products");
    const data = await res.json();
    resolve({ data });
  });
}

export function fetchAllProductByFilters(filter, sort, pagination) {
  let queryString = "";
  for (const key in filter) {
    const categoryValue = filter[key];
    const LastCategoryValue = categoryValue[categoryValue.length - 1];
    if (LastCategoryValue) {
      queryString += `${key}=${LastCategoryValue}&`;
    }
  }
  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products?" + queryString);
    const data = await res.json();
    let totalItem = await res.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItem: totalItem } });
  });
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/category");
    const data = await res.json();
    resolve({ data });
  });
}
export function fetchAllBrand() {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/brand");
    const data = await res.json();
    resolve({ data });
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const res = await fetch("http://localhost:8080/products/"+id);
    const data = await res.json();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    resolve({ data });
  });
}