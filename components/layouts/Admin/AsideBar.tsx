"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../redux-hook/hooks";
import { logout } from "../../../feature/auth/authSlice";
import { useGetUserQuery, useLogoutMutation } from "../../../feature/api/authApi";
import logo from "../../../assets/logo.png";
import user from "../../../assets/user.png";
import MobileAsideBar from "./MobileAsideBar";

import {
  AiOutlineAppstore,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdQuiz } from "react-icons/md";
import { BsFillChatLeftDotsFill, BsMenuButton } from "react-icons/bs";
import {
  MapPinIcon,
  BellIcon,
  InboxIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export type MenuItem = {
  name: string;
  id: number;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  activePaths?: string[];
  children?: MenuItem[];
  clickHandler?: () => void;
};

const isPathActive = (pathname: string, paths: string[]) =>
  paths.some((path) => pathname === path);

const getMenuItems = (roles: string[], pathname: string): MenuItem[] => {
  if (roles.includes("admin")) {
    return [
      {
        name: "Creation",
        id: 6,
        icon: AiOutlineTeam,
        activePaths: [
          "/dashboard/academic-faculty",
          "/dashboard/academic-department",
          "/dashboard/course/creation",
          "/dashboard/quiz/quiz-creation",
          "/dashboard/assignments/[singleAssignment]",
        ],
        children: [
          {
            name: "Assignment-creation",
            id: 7,
            url: "/dashboard/assignment-creation",
            activePaths: ["/dashboard/assignment-creation"],
          },
          {
            name: "Course creation",
            id: 8,
            url: "/dashboard/course/creation",
            activePaths: ["/dashboard/course/creation"],
          },
          {
            name: "Quiz Creation",
            id: 9,
            url: "/dashboard/quiz/quiz-creation",
            activePaths: ["/dashboard/quiz/quiz-creation"],
          },
        ],
      },
      {
        name: "All things",
        id: 10,
        url: "/dashboard/semester",
        icon: AiOutlineTeam,
        children: [
          {
            name: "All quizzes of a instructor",
            id: 11,
            url: "/dashboard/quiz/all-quiz-instructor",
            activePaths: ["/dashboard/quiz/all-quiz-instructor"],
          },
          {
            name: "All submitted assignments",
            id: 12,
            url: "/dashboard/assignment/all-assignments",
            activePaths: ["/dashboard/assignment/all-assignments"],
          },
          {
            name: "All created assignments",
            id: 13,
            url: "/dashboard/assignment/all-created-assignments",
            activePaths: ["/dashboard/assignment/all-created-assignments"],
          },
        ],
      },
    ];
  }

  if (roles.includes("superAdmin")) {
    return [
      {
        name: "Main",
        id: 14,
        url: "/dashboard/semester",
        icon: AiOutlineTeam,
        activePaths: [
          "/dashboard/academic-faculty",
          "/dashboard/academic-department",
          "/dashboard/course/creation",
          "/dashboard/quiz/quiz-creation",
          "/dashboard/assignments/[singleAssignment]",
        ],
        children: [],
      },
      {
        name: "Creation",
        id: 15,
        icon: AiOutlineTeam,
        activePaths: [
          "/dashboard/academic-faculty",
          "/dashboard/academic-department",
          "/dashboard/course/creation",
          "/dashboard/quiz/quiz-creation",
          "/dashboard/assignments/[singleAssignment]",
        ],
        children: [
          {
            name: "Academic faculty",
            id: 16,
            url: "/dashboard/academic-faculty",
            activePaths: ["/dashboard/academic-faculty"],
          },
          {
            name: "Academic department",
            id: 17,
            url: "/dashboard/academic-department",
            activePaths: ["/dashboard/academic-department"],
          },
          {
            name: "Assignment-creation",
            id: 18,
            url: "/dashboard/assignment-creation",
            activePaths: ["/dashboard/assignment-creation"],
          },
          {
            name: "Course creation",
            id: 19,
            url: "/dashboard/course/creation",
            activePaths: ["/dashboard/course/creation"],
          },
          {
            name: "Quiz Creation",
            id: 20,
            url: "/dashboard/quiz/quiz-creation",
            activePaths: ["/dashboard/quiz/quiz-creation"],
          },
        ],
      },
      {
        name: "All things",
        id: 21,
        url: "/dashboard/semester",
        icon: AiOutlineTeam,
        children: [
          {
            name: "All quizzes of a instructor",
            id: 22,
            url: "/dashboard/quiz/all-quiz-instructor",
            activePaths: ["/dashboard/quiz/all-quiz-instructor"],
          },
          {
            name: "All submitted assignments",
            id: 23,
            url: "/dashboard/assignment/all-assignments",
            activePaths: ["/dashboard/assignment/all-assignments"],
          },
          {
            name: "All created assignments",
            id: 24,
            url: "/dashboard/assignment/all-created-assignments",
            activePaths: ["/dashboard/assignment/all-created-assignments"],
          },
          {
            name: "Admission Requests",
            id: 25,
            url: "/dashboard/admission-request",
            activePaths: ["/dashboard/admission-request"],
          },
        ],
      },
      {
        name: "Assign Admin",
        id: 26,
        url: "/dashboard/assign-admin",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard/assign-admin"],
      },
      {
        name: "Assign Instructors",
        id: 27,
        url: "/dashboard/assign-instructor",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard/assign-instructor"],
      },
    ];
  }

  if (
    roles.some((r) => r === "instructor" || r === "faculty")
  ) {
    return [
      {
        name: "Dashboard",
        id: 28,
        url: "/dashboard",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard"],
      },
      {
        name: "My Courses",
        id: 29,
        url: "/dashboard/course/creation",
        icon: AiOutlineUser,
        activePaths: [
          "/dashboard/courses",
          "/dashboard/course/creation",
          "/dashboard/course/edit/[editId]",
        ],
      },
      {
        name: "All my courses",
        id: 30,
        url: "/dashboard/courses",
        icon: AiOutlineUser,
        activePaths: [
          "/dashboard/courses",
          "/dashboard/course/creation",
          "/dashboard/course/edit/[editId]",
        ],
      },
      {
        name: "Quiz",
        id: 31,
        url: "/dashboard/quiz",
        icon: MdQuiz,
        activePaths: [
          "/dashboard/quiz/all-quiz",
          "/dashboard/quiz/quiz-creation",
          "/dashboard/quiz",
        ],
        children: [
          {
            name: "All quizzes of a instructor",
            id: 32,
            url: "/dashboard/quiz/all-quiz-instructor",
            activePaths: ["/dashboard/quiz/all-quiz-instructor"],
          },
          {
            name: "Add Quiz",
            id: 33,
            url: "/dashboard/quiz/quiz-creation",
            activePaths: ["/dashboard/quiz/quiz-creation"],
          },
        ],
      },
      {
        name: "Messages",
        id: 34,
        url: "/dashboard/messages",
        icon: BsFillChatLeftDotsFill,
        activePaths: ["/dashboard/messages"],
      },
      {
        name: "Students",
        id: 35,
        url: "/dashboard/students",
        icon: BsMenuButton,
        activePaths: ["/dashboard/students"],
      },
      {
        name: "Assignments",
        id: 36,
        url: "/dashboard/assignment/all-assignments",
        icon: AiOutlineTeam,
        activePaths: [
          "/dashboard/assignment/all-assignments",
          "/dashboard/assignment-creation",
          "/dashboard/assignment/submitassignment",
          "/dashboard/assignmentmarking/[id]",
          "/dashboard/assignment/submit-assignment",
          "/dashboard/assignment/edit/[id]",
          "/dashboard/assignments/[singleAssignment]",
        ],
        children: [
          {
            name: "Assignment-creation",
            id: 37,
            url: "/dashboard/assignment-creation",
            activePaths: ["/dashboard/assignment-creation"],
          },
          {
            name: "All submitted assignments",
            id: 38,
            url: "/dashboard/assignment/all-assignments",
            activePaths: ["/dashboard/assignment/all-assignments"],
          },
        ],
      },
      {
        name: "Live Class",
        id: 39,
        url: "/dashboard/live-class-with-screen",
        icon: VscDeviceCameraVideo,
        activePaths: ["/dashboard/live-class-with-screen"],
      },
    ];
  }

  if (["student", "admitted"].every((role) => roles.includes(role))) {
    return [
      {
        name: "Dashboard",
        id: 40,
        url: "/dashboard",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard"],
      },
      {
        name: "My Courses",
        id: 41,
        url: "/dashboard/my-course",
        icon: AiOutlineUser,
        activePaths: [
          "/dashboard/my-course",
          "/dashboard/my-course/[id]",
          "/dashboard/page-overview/[id]",
        ],
      },
      {
        name: "Messages",
        id: 42,
        url: "/dashboard/messages",
        icon: BsFillChatLeftDotsFill,
        activePaths: ["/dashboard/messages"],
      },
      {
        name: "Live Class",
        id: 43,
        url: "/dashboard/live-class-with-screen",
        icon: VscDeviceCameraVideo,
        activePaths: ["/dashboard/live-class-with-screen"],
      },
      {
        name: "Grades",
        id: 44,
        url: "/dashboard/students/grade",
        icon: MdNoteAdd,
        activePaths: ["/dashboard/students/grade"],
      },
    ];
  }

  if (["student"].every((role) => roles.includes(role))) {
    return [
      {
        name: "Take Admission",
        id: 45,
        url: "/dashboard/take-admission",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard/take-admission"],
      },
      {
        name: "Dashboard",
        id: 46,
        url: "/dashboard",
        icon: AiOutlineAppstore,
        activePaths: ["/dashboard"],
      },
    ];
  }

  return [];
};

const MenuItem = ({ item, pathname }: { item: MenuItem; pathname: string }) => {
  const [hover, setHover] = useState(false);
  const active = isPathActive(pathname, item.activePaths || []);
  const activeClass = active
    ? "!border-[#3A57E8] !text-[#3A57E8]"
    : "";

  if (item.children) {
    return (
      <Disclosure as="div" defaultOpen={active}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`flex w-full justify-between items-center text-left text-[#8A92A6] hover:text-[#3A57E8] cursor-pointer px-10 py-2 ${activeClass}`}
            >
              <div className="flex justify-between items-center gap-2">
                {item.icon && <item.icon className="w-5 h-5" />}
                <h1>{item.name}</h1>
              </div>
              <span>
                {open ? (
                  <MdOutlineKeyboardArrowDown className="w-6 h-6" />
                ) : (
                  <MdOutlineKeyboardArrowUp className="w-6 h-6" />
                )}
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="flex flex-col justify-center items-left w-full pl-[70px] text-[#8A92A6] hover:text-[#3A57E8] cursor-pointer mt-[10px]">
              {item.children.map((dropdown) => (
                <DropdownItem
                  key={dropdown.name}
                  item={dropdown}
                  pathname={pathname}
                />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  if (item.clickHandler) {
    return (
      <div
        className={`border-l-2 border-[#fff] hover:border-[#3A57E8] px-10 py-2 flex justify-between items-center text-[#8A92A6] hover:text-[#3A57E8] group/item cursor-pointer ${activeClass}`}
      >
        <div
          className="flex items-center gap-2"
          onClick={item.clickHandler}
        >
          {item.icon && <item.icon className="h-5 w-5" />}
          <h4 className="text-[16px] font-medium">{item.name}</h4>
        </div>
        <ChevronRightIcon className="h-5 w-5 group-hover/item:text-gray-700 invisible group-hover/item:visible" />
      </div>
    );
  }

  return (
    <Link href={item.url || "#"}>
      <span
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`border-l-2 border-[#fff] hover:border-[#3A57E8] px-10 py-2 flex justify-between items-center text-[#8A92A6] hover:text-[#3A57E8] group/item cursor-pointer ${activeClass}`}
      >
        <div className="flex items-center gap-2">
          {item.icon && <item.icon className="w-5 h-5" />}
          <h4 className="text-[16px] font-medium">{item.name}</h4>
        </div>
        {hover && <ChevronRightIcon className="h-5 w-5" />}
      </span>
    </Link>
  );
};

const DropdownItem = ({
  item,
  pathname,
}: {
  item: MenuItem;
  pathname: string;
}) => {
  const active = isPathActive(pathname, item.activePaths || []);
  const activeClass = active
    ? "!border-[#3A57E8] !text-[#3A57E8]"
    : "";

  return (
    <div
      className={`${activeClass} mb-[10px] text-[#8A92A6] hover:text-[#3A57E8] cursor-pointer text-[14px]`}
    >
      <Link href={item.url || "#"}>{item.name}</Link>
    </div>
  );
};

const AsideBar = () => {
  const avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
  const pathname = usePathname();
  const { data } = useGetUserQuery({});
  const userData = data?.data?.user ?? data?.data;
  const roles = useMemo(() => userData?.roles || [], [userData]);
  const email = userData?.email || "";

  const [show, setShow] = useState(true);
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const menuItems = useMemo(() => getMenuItems(roles, pathname), [roles, pathname]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (err: any) {
      toast.error("Logout failed!");
      console.error("Logout error:", err);
    }
  };

  const width = show ? "w-[260px]" : "-translate-x-[240px] w-0";

  return (
    <>
      <div
        className={`${width} hidden lg:flex flex-col gap-3 relative font-nunito`}
      >
        <div className="mt-5 text-center">
          <Link href="/">
            <span className="flex justify-center items-center gap-2">
              <Image
                src={logo}
                width={35}
                height={35}
                className="h-5 w-6"
                alt="logo"
              />
              <span className="uppercase font-semibold text-2xl">
                Think Trail
              </span>
            </span>
          </Link>
        </div>

        <div className="p-5 flex flex-col gap-2 items-center font-nunito">
          <div className="border border-blue-600 w-[70px] h-[70px] relative rounded-md overflow-hidden">
            <Image
              src={avatar ? avatar : user}
              layout="fill"
              alt="avatar"
              objectFit="cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-[#001F4D] font-medium">{email}</h3>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <InboxIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none"
            >
              <span className="sr-only">View notifications</span>
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="border-b mt-4 w-full" />
        </div>

        <div className="flex flex-col gap-3 font-nunito">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="border-b mt-4 w-full px-5" />

        <div className="px-5 pt-3">
          <h3 className="text-[#232D42] font-semibold uppercase">Other</h3>
        </div>
        <div>
          {[
            {
              name: "Sign Out",
              id: 1,
              icon: AiOutlineLogout,
              clickHandler: logoutHandler,
            },
            { name: "Help", id: 2, icon: AiOutlineInfoCircle },
          ].map(({ name, id, icon: Icon, clickHandler }) => (
            <div
              key={id}
              className="border-l-2 border-[#8A92A6] hover:border-[#3A57E8] px-10 py-2 flex justify-between items-center text-[#8A92A6] hover:text-[#3A57E8] group/item"
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={clickHandler}
              >
                <Icon className="h-5 w-5" />
                <h4 className="text-[16px] font-medium">{name}</h4>
              </div>
              <ChevronRightIcon className="h-5 w-5 group-hover/item:text-gray-700 invisible group-hover/item:visible" />
            </div>
          ))}
        </div>

        <div
          onClick={() => setShow(!show)}
          className={`absolute top-3 ${
            !show ? "right-10" : "-right-4"
          } rounded-full bg-blue-800 text-white p-3 cursor-pointer`}
        >
          <AiOutlineArrowLeft className="text-lg" />
        </div>
      </div>

      {!show && (
        <button
          onClick={() => setShow(!show)}
          className="rounded-full bg-blue-800 text-white text-center inline-block w-10 h-10 font-semibold mt-3 absolute left-2 cursor-pointer lg:hidden"
        >
          <AiOutlineArrowRight className="text-lg inline-block" />
        </button>
      )}

      {/* <MobileAsideBar /> */}
    </>
  );
};

export default AsideBar;
