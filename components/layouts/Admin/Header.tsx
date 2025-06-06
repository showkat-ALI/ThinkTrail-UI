"use client"
import { Fragment, useEffect } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  MapPinIcon,
  UserIcon,
  ArrowsUpDownIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import arrow from "../../../assets/arrow.png";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useLogoutMutation } from "../../../feature/api/authApi";
import { useAppDispatch } from "../../../redux-hook/hooks";
import { logout, logout as logoutAction } from "../../../feature/auth/authSlice";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
import { useAppSelector } from "../../../redux-hook/hooks";
import { useDispatch } from "react-redux";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router=useRouter()
  const [logoutApiCall] = useLogoutMutation();
 const dispatch = useDispatch()
 const logoutHandler = async () => {
   try {
     await logoutApiCall({}).unwrap(); // call API
     dispatch(logout());              // clear Redux state
     toast.success("Logged out successfully!");
     setTimeout(() => {
       router.push("/signin"); // or "/"
     }, 1500);
   } catch (err: any) {
     toast.error("Logout failed!");
     console.error("Logout error:", err);
   }
 };
  const {
    user: { email },
    refresh,
  } = useAppSelector((state) => state.auth);

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#", clickHandler: logoutHandler },
  ];
  return (
    <>
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="pl-14 pr-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center divide-x-2">
                  <div className="flex-shrink-0 pr-3">
                    <Link href="/">
                      <span>Home</span>
                    </Link>
                  </div>
                  <div className=" px-3">
                    <Link href={"/"}>
                      <span className="flex gap-3">
                        <HomeIcon className="h-5 w-5" />
                        <h3>Home</h3>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex divide-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search"
                        className="py-2 rounded px-4"
                      />
                      <BsSearch className="absolute right-2 top-3 font-bold text-lg" />
                    </div>
                    <div className="pl-4 flex items-center gap-3 md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none "
                      >
                        <span className="sr-only">View notifications</span>
                        <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ">
                        <div>
                          <Menu.Button className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none ">
                            <span className="sr-only">Open user menu</span>
                            <UserIcon className="h-4 w-4" aria-hidden="true" />
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    onClick={item.clickHandler}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <button
                        type="button"
                        className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none"
                      >
                        <span className="sr-only">View notifications</span>
                        <ArrowsUpDownIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
}
