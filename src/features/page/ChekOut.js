import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemAsync, updateCartAsync } from "../cart/CartSlice";
import { useForm } from "react-hook-form";
import { addOrderAsync } from "../order/orderSlice";
import { updateUserAsync } from "../auth/authSlice";


const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    street: "15, milse malls",
    city: "mumbai",
    state: "maharstar",
    pinCode: 112233,
    phone: 12234567890,
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    street: "15, milse malls",
    city: "mumbai",
    state: "maharstar",
    pinCode: 112233,
    phone: 12234567890,
  },
];
function Checkout() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const products = useSelector((state) => state.cart.item);
  const currentOrderID = useSelector((state) => state.order.currentOrder);
  const user = useSelector((state) => state.user.userInfo);
  const [open, setOpen] = useState(true);
  const [selectAddress, setSelectAddress] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const totalAmount = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItem = products.reduce((total, item) => +item.quantity + total, 0);
  const dispatch = useDispatch();

  const handlerQuantity = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: e.target.value }));
  };
  const handlerRemove = (e, id) => {
    dispatch(deleteCartItemAsync(id));
  };
  const handleAddress = (e) => {
    setSelectAddress(user.address[e.target.value]);
  };
  const handlePayment = (e) => {
    setPaymentMode(e.target.value);
  };
  console.log('====================================');
  console.log('currentOrderID',currentOrderID);
  console.log('====================================');
  const handleOrder = (e) => {
    if (selectAddress && paymentMode) {
      let order = {
        products,
        totalAmount,
        user,
        totalItem,
        paymentMode,
        selectAddress,
        status: "pending",
      };
      dispatch(addOrderAsync(order));
    } else {
      alert("Enter Address and Payment");
    }
  };

  return (
    <>
      {!products.length && <Navigate to="/login" replace={true}></Navigate>}
      {currentOrderID && (
        <Navigate
          to={`/order-success/${currentOrderID.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-8xl px-9 py-7 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              noValidate
              className="bg-gray-300 rounded-md  px-5 py-5"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  updateUserAsync({ ...user, address: [...user.address, data] })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("firstName", {
                            required: "First Name required",
                          })}
                          id="firstName"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName && (
                          <p className="text-red-500">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("lastName", {
                            required: "Last Name required",
                          })}
                          id="lastName"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName && (
                          <p className="text-red-500">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: "Email required" })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="phone"
                          {...register("phone", {
                            required: "Phone required",
                          })}
                          id="phone"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">
                            {errors?.phone?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "Street required",
                          })}
                          id="street"
                          autoComplete="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.street && (
                          <p className="text-red-500">
                            {errors?.street?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", { required: "City required" })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.city && (
                          <p className="text-red-500">
                            {errors?.city?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "State required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">
                            {errors?.state?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "Pincode required",
                          })}
                          id="pinCode"
                          autoComplete="pincode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors?.pinCode?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Add address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from exitsing addresses
                  </p>
                  <ul role="list">
                    {user.address.map((person, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-10 mb-2 rounded-lg  border-solid border-2 border-gray-200 px-4"
                      >
                        <div className="flex gap-x-4 items-center">
                          <input
                            onChange={handleAddress}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.email}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.phone}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-600">
                            {person.street + " " + person.state}
                          </p>

                          <p className="text-sm leading-6 text-gray-600">
                            {person.city + " " + person.pinCode}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            id="cash"
                            name="payment"
                            type="radio"
                            value={"cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="paynow"
                            onChange={handlePayment}
                            name="payment"
                            type="radio"
                            value={"card"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="paynow"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto bg-gray-300 rounded-md  max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-4 font-bold tracking-tight text-gray-900">
                  Cart list
                </h1>
                <div className="flow-root ">
                  <ul role="list" className="-my-6 divide-y divide-gray-200 ">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border  border-gray-200">
                          <img
                            src={product.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.item}</a>
                              </h3>
                              <p className="ml-4">₹ {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
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
                  <p>₹{totalAmount}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Item in cart </p>
                  <p>{totalItem} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
