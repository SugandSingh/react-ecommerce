import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { deleteCartItemAsync, updateCartAsync } from "./CartSlice";

export function Cart() {
  const products = useSelector((state) => state.cart.item);
  const totalAmount = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItem = products.reduce((total, item) => +item.quantity + total, 0);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const handlerQuantity = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: e.target.value }));
  };
  const handlerRemove = (e, id) => {
    dispatch(deleteCartItemAsync(id));
  };

  return (
    <>
    {!products.length&&<Navigate to="/login" replace={true}></Navigate>}
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-4 font-bold tracking-tight text-gray-900">
            Cart list
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.title}</a>
                        </h3>
                        <p className="ml-4">₹ {product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>

                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="sm:col-span-5">
                        <div className="flex flex-1 items-center justify-between  mt-2">
                          <label
                            htmlFor="qty"
                            className="block text-sm font-medium mr-2 leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            value={product.quantity}
                            onChange={(e) => handlerQuantity(e, product)}
                            id="qty"
                            name="qty"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex">
                        <button
                          onClick={(e) => {
                            handlerRemove(e, product.id);
                          }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹ {totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Item in cart </p>
            <p>{totalItem} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{"  "}
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
