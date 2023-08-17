import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync } from "../userSlice";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const orders = useSelector((state) => state?.user?.userOrder);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user?.id));
  }, [user?.id]);

  console.log("====================================");
  console.log("orders", orders);
  console.log("====================================");
  return (
    <div>
      {orders?.map((order) => {
        return (
          <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-4 font-bold tracking-tight text-gray-900">
                Order # {order.id}
              </h1>
              <h3 className="text-xl my-4 font-bold tracking-tight text-red-500">
                Order status # {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order?.products?.map((product) => (
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
                                Qty : {product.quantity}
                              </label>
                            </div>
                          </div>

                          <div className="flex"></div>
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
                <p>₹ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Item in cart </p>
                <p>{order.totalItem} Items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address : -
              </p>
              <div className="flex justify-between gap-x-6 py-10 mb-2 rounded-lg  border-solid border-2 border-gray-200 px-4">
                <div className="flex gap-x-4 items-center">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectAddress?.firstName +
                        " " +
                        order.selectAddress?.lastName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress?.email}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress?.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-600">
                    {order.selectAddress?.street +
                      " " +
                      order.selectAddress?.state}
                  </p>

                  <p className="text-sm leading-6 text-gray-600">
                    {order.selectAddress?.city +
                      " " +
                      order.selectAddress?.pinCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
