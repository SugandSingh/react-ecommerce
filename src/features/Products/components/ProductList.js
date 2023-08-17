/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllBrandAsync,
  fetchAllCategoryAsync,
  fetchAllProductAsync,
  fetchAllProductByFiltersAsync,
} from "../ProductSlice";
import { ITEM_PER_PAGE } from "../../../app/constants";
import { handler } from "@tailwindcss/aspect-ratio";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];
const subCategories = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const products = useSelector((state) => state.product.product);
  const totalItem = useSelector((state) => state.product.totalItem);
  const category = useSelector((state) => state.product.category);
  const brand = useSelector((state) => state.product.brand);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: category,
    },
    {
      id: "brand",
      name: "Brand",
      options: brand,
    },
  ];
  const handlerFilter = (e, section, option) => {
    console.log(e.target.checked);
    let newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (item) => item === option.value
      );
      newFilter[section.id].splice(index, 1);
    }

    setFilter(newFilter);
  };
  const handlerSort = (e, option) => {
    let sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };
  const handlerPage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    dispatch(fetchAllCategoryAsync());
    dispatch(fetchAllBrandAsync());
  }, []);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllProductByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);
  useEffect(() => {
    setPage(1);
  }, [totalItem]);
  return (
    <div>
      <div>
        <div>
          <MobileFilter
            handlerFilter={handlerFilter}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Product
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => handlerSort(e, option)}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-0 pt-2">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <DesktopFilter
                  handlerFilter={handlerFilter}
                  filters={filters}
                ></DesktopFilter>

                {/* Product grid */}

                <div className="lg:col-span-3">
                  <ProductGrid products={products}></ProductGrid>
                </div>
                {/* product grid end */}
              </div>
            </section>
            <div >
              <Pagination
                handlerPage={handlerPage}
                totalItem={totalItem}
                page={page}
                setPage={setPage}
              ></Pagination>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handlerFilter,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
function Pagination({ page, handlerPage, setPage, totalItem }) {
  const totalPage = Math.ceil(totalItem / ITEM_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
           onClick={(e) => handlerPage(page > 1 ? page - 1 : page)}
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
           onClick={(e) => handlerPage(page < totalPage ? page + 1 : page)}
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEM_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEM_PER_PAGE > totalItem
                ? totalItem
                : page * ITEM_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItem}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlerPage(page > 1 ? page - 1 : page)}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: totalPage }).map((el, index) => (
              <div
                onClick={(e) => handlerPage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlerPage(page < totalPage ? page + 1 : page)}
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
function DesktopFilter({ handlerFilter, filters }) {
  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        onChange={(e) => {
                          handlerFilter(e, section, option);
                        }}
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-0 py- sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products?.map((product) => (
            <Link key={product.id} to={`/productdetail/${product.id}`}>
              <div className="group relative border-solid border-2 border-gray-400 p-4 rounded-lg">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm  text-gray-700  text-ellipsis">
                      <span
                        aria-hidden="true"
                        className="absolute max inset-0"
                      />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline" />
                      <span className="align-bottom ml-2">
                        {product.rating}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm line-through font-medium text-gray-400">
                      ₹ {Math.round(product.price) * 80}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹
                      {Math.round(
                        product.price *
                          (1 - product.discountPercentage / 100) *
                          80
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
