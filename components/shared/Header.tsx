"use client"
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import Link from "next/link";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "../../redux-hook/hooks";
import UserMenu from "./UserMenu";
import { isAuthorized } from "../../utils/auth";

const menu: {
  name: string;
  url?: string;
  submenus?: {
    name: string;
    url: string;
  }[];
}[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About Us",
    url: "/about",
  },
  {
    name: "Departments",
    url: "/departments",
  },
];

function classNames(...classes: any[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const {
    user: { email, avatar, firstName },
    refresh,
  } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/5 border-b border-slate-800/30">
      <Popover className="relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-400/20">
                    <Image
                      width={20}
                      height={20}
                      className="h-5 w-5"
                      src={logo}
                      alt="Think Trail Logo"
                    />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                    Think Trail
                  </span>
                </div>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800/50 hover:text-white focus:outline-none">
                <span className="sr-only">Open menu</span>
                <AiOutlineBars className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            
            {/* Desktop navigation */}
            <Popover.Group as="nav" className="hidden lg:flex lg:gap-x-10">
              {menu.map((menuItem, idx) => (
                <Fragment key={idx}>
                  {menuItem.submenus ? (
                    <DropDown subMenus={menuItem} />
                  ) : (
                    <Link 
                      href={menuItem?.url ? menuItem?.url : "#"}
                      className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {menuItem.name}
                    </Link>
                  )}
                </Fragment>
              ))}
            </Popover.Group>

            {/* Auth buttons */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
              {!isAuthorized(email, refresh) ? (
                <>
                  <Link 
                    href="/signin"
                    className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/registration"
                    className="rounded-md bg-gradient-to-r from-emerald-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-emerald-400 hover:to-blue-500 transition-all duration-200"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <UserMenu
                  userEmail={email}
                  username={firstName}
                  avatar={avatar}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition lg:hidden z-50"
          >
            <div className="divide-y divide-slate-800/50 rounded-lg bg-slate-900/95 backdrop-blur-xl shadow-lg ring-1 ring-slate-800">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-400/20">
                      <Image height={20} width={20} src={logo} alt="Think Trail Logo" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                      Think Trail
                    </span>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800/50 hover:text-white focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                  {menu.map((menuItem, idx) => (
                    <Link
                      key={idx}
                      href={menuItem.url ? menuItem.url : ""}
                      className="text-base font-medium text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                    >
                      {menuItem.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  {!isAuthorized(email, refresh) ? (
                    <>
                      <Link 
                        href="/signin"
                        className="w-full rounded-md px-4 py-2.5 text-center text-sm font-medium text-gray-300 hover:bg-slate-800/50 hover:text-emerald-400 transition-colors duration-200"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/registration"
                        className="w-full rounded-md bg-gradient-to-r from-emerald-500 to-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:from-emerald-400 hover:to-blue-500 transition-all duration-200"
                      >
                        Get started
                      </Link>
                    </>
                  ) : (
                    <UserMenu
                      userEmail={email}
                      username={firstName}
                      avatar={avatar}
                      mobile
                    />
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}

const DropDown = ({
  subMenus,
}: {
  subMenus: {
    name: string;
    url?: string | undefined;
    submenus?: {
      name: string;
      url: string;
    }[];
  };
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "text-gray-300 hover:text-emerald-400 transition-colors duration-200",
              "group inline-flex items-center gap-x-1 text-sm font-medium focus:outline-none",
              open ? "text-emerald-400" : ""
            )}
          >
            <span>{subMenus.name}</span>
            <IoIosArrowDown
              className={classNames(
                open ? "rotate-180 text-emerald-400" : "text-gray-400",
                "h-4 w-4 flex-none transition-all duration-200 group-hover:text-emerald-400"
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-slate-900/95 backdrop-blur-xl p-2 shadow-lg ring-1 ring-slate-800">
              <div className="space-y-1">
                {subMenus?.submenus?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-slate-800/50 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};