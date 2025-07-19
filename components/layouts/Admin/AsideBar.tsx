"use client"
import {
  MapPinIcon,
  BellIcon,
  InboxIcon,
  
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { SiPagekit } from "react-icons/si";
import React, { useState, useEffect } from "react";
import {
  AiOutlineAppstore,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
  AiFillSetting,
} from "react-icons/ai";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { MdQuiz } from "react-icons/md";
import { BsFillChatLeftDotsFill, BsMenuButton } from "react-icons/bs";
import { useAppSelector } from "../../../redux-hook/hooks";
import logo from "../../../assets/logo.png";
import user from "../../../assets/user.png";
import MobileAsideBar from "./MobileAsideBar";
import { useGetUserQuery, useLogoutMutation } from "../../../feature/api/authApi";
import { useAppDispatch } from "../../../redux-hook/hooks";
import { logout  } from "../../../feature/auth/authSlice";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation"; 
import { ImFilesEmpty } from "react-icons/im";
import { BiGroup } from "react-icons/bi";
import { MdNoteAdd } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { Disclosure } from "@headlessui/react";

import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
const AsideBar = () => {
  const avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"; // Unsplash avatar URL
  const firstName = "John";
  const lastName = "Doe";
  const userName = "johndoe123";
  // const {
  //   id,
  //   email,
  //   isDeleted,
  //   roles,
  //   needsPasswordChange,
  //   status,
  //   passwordChangedAt,
    
  // } = useAppSelector((state) => state.auth.user);
  const pathname = usePathname(); // Get the current pathname
  const { data, isError, error, isLoading } = useGetUserQuery({});
  const roles = data?.data?.user?.roles;
  const email = data?.data?.user?.email;
  console.log(roles)
  const [show, setShow] = useState(true);
  let width = "w-[260px]";
  if (!show) {
    width = "-translate-x-[240px] w-0";
  }
  const router = useRouter();

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

  return (
    <>
      <div
        className={`${width} hidden lg:flex flex-col gap-3 relative font-nunito`}
      >
        <div className="mt-5 text-center">
          <Link href="/">
            <span className="flex justify-center items-center gap-2 ">
              <Image
                src={logo}
                width={35}
                height={35}
                className="h-5 w-6"
                alt={"logo"}
              />

              <span className="uppercase font-semibold text-2xl">Think Trail</span>
            </span>
          </Link>
        </div>
        {/* profile section  */}
        <div className="p-5 flex flex-col gap-2 items-center font-nunito">
          <div className="border border-blue-600 w-[70px] h-[70px] relative rounded-md overflow-hidden">
            <Image
              src={avatar ? avatar : user}
              layout="fill"
              alt={"avatar"}
              objectFit="cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-[#001F4D] font-medium">
              {email}
            </h3>
           
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none "
            >
              <span className="sr-only">View notifications</span>
              <InboxIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none "
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-full bg-[#3A57E8] p-3 text-white hover:text-white focus:outline-none "
            >
              <span className="sr-only">View notifications</span>
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="border-b mt-4 w-full"></div>
        </div>
        {/* menu section  */}
        <div className="flex flex-col gap-3 font-nunito">
        {
  roles && roles.includes("admin")
    ? [
        {
          name: "Creation",
          id: 6,
          icon: AiOutlineTeam,
          active:
            pathname === "/dashboard/academic-faculty" ||
            pathname === "/dashboard/academic-department" ||
            pathname === "/dashboard/course/creation" ||
            pathname === "/dashboard/quiz/quiz-creation" ||
            pathname === "/dashboard/assignments/[singleAssignment]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          children: [
            {
              name: "Assignment-creation",
              url: "/dashboard/assignment-creation",
              active:
                pathname == "/dashboard/assignment-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Course creation",
              url: "/dashboard/course/creation",
              active:
                pathname == "/dashboard/course/creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Quiz Creation",
              url: "/dashboard/quiz/quiz-creation",
              active:
                pathname == "/dashboard/quiz/quiz-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
          ],
        },
        
        {
          name: "All things",
          id: 6,
          url: "/dashboard/semester",
          icon: AiOutlineTeam,
          children: [
            {
              name: "All quizzes of a instructor",
              url: "/dashboard/quiz/all-quiz-instructor",
              active:
                pathname == "/dashboard/quiz/all-quiz-instructor"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "All submitted assignments",
              url: "/dashboard/assignment/all-assignments",
              active:
                pathname == "/dashboard/assignment/all-assignments"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
                
              },
            {
              name: "All created assignments",
              url: "/dashboard/assignment/all-created-assignments",
              active:
                pathname == "/dashboard/assignment/all-assignments"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
                
              }
            ]
          }
              ].map((single, idx) => <Item key={idx} item={single} />)
            
    : roles && roles.includes("superAdmin")
    ? [
        {
          name: "Main",
          id: 6,
          url: "/dashboard/semester",
          icon: AiOutlineTeam,
          active:
            pathname === "/dashboard/academic-faculty" ||
            pathname === "/dashboard/academic-department" ||
            pathname === "/dashboard/course/creation" ||
            pathname === "/dashboard/quiz/quiz-creation" ||
            pathname === "/dashboard/assignments/[singleAssignment]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          children: [],
        },
        {
          name: "Creation",
          id: 6,
          icon: AiOutlineTeam,
          active:
            pathname === "/dashboard/academic-faculty" ||
            pathname === "/dashboard/academic-department" ||
            pathname === "/dashboard/course/creation" ||
            pathname === "/dashboard/quiz/quiz-creation" ||
            pathname === "/dashboard/assignments/[singleAssignment]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          children: [
            {
              name: "Academic faculty",
              url: "/dashboard/academic-faculty",
              active:
                pathname == "/dashboard/academic-faculty"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Academic department",
              url: "/dashboard/academic-department",
              active:
                pathname == "/dashboard/academic-department"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Assignment-creation",
              url: "/dashboard/assignment-creation",
              active:
                pathname == "/dashboard/assignment-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Course creation",
              url: "/dashboard/course/creation",
              active:
                pathname == "/dashboard/course/creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Quiz Creation",
              url: "/dashboard/quiz/quiz-creation",
              active:
                pathname == "/dashboard/quiz/quiz-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
          ],
        },
        {
          name: "All things",
          id: 6,
          url: "/dashboard/semester",
          icon: AiOutlineTeam,
          children: [
            {
              name: "All quizzes of a instructor",
              url: "/dashboard/quiz/quiz/all-quiz-instructor",
              active:
                pathname == "/dashboard/quiz/all-quiz-instructor"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "All submitted assignments",
              url: "/dashboard/assignment/all-assignments",
              active:
                pathname == "/dashboard/assignment/all-assignments"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "All created assignments",
              url: "/dashboard/assignment/all-created-assignments",
              active:
                pathname == "/dashboard/assignment/all-assignments"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
                
              },
            {
              name: "Admission Requests",
              url: "/dashboard/admission-request",
              active:
                pathname == "/dashboard/admission-request"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
          ],
        },
        {
          name: "Assign Admin",
          url: "/dashboard/assign-admin",
          id: 344,
          icon: AiOutlineAppstore,
          active:
            pathname == "/dashboard/assign-admin"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Assign Instructors",
          url: "/dashboard/assign-instructor",
          id: 344,
          icon: AiOutlineAppstore,
          active:
            pathname == "/dashboard/assign-instructor"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
      ].map((single, idx) => <Item key={idx} item={single} />)
    : roles && roles.includes("instructor")
    ? [
        {
          name: "Dashboard",
          id: 1,
          url: "/dashboard",
          icon: AiOutlineAppstore,
          active:
            pathname == "/dashboard"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "My Courses",
          id: 2,
          url: "/dashboard/courses",
          icon: AiOutlineUser,
          active:
            pathname == "/dashboard/courses" ||
            pathname == "/dashboard/course/creation" ||
            pathname == "/dashboard/course/edit/[editId]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Quiz",
          id: 3,
          url: "/dashboard/quiz",
          icon: MdQuiz,
          active:
            pathname == "/dashboard/quiz/all-quiz" ||
            pathname == "/dashboard/quiz/quiz-creation" ||
            pathname == "/dashboard/quiz"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          children: [
            {
              name: "All quizzes of a instructor",
              url: "/dashboard/quiz/quiz/all-quiz-instructor",
              active:
                pathname == "/dashboard/quiz/all-quiz-instructor"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "Add Quiz",
              url: "/dashboard/quiz/quiz-creation",
              active:
                pathname == "/dashboard/quiz/quiz-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
          ],
        },
        {
          name: "Messages",
          id: 3,
          url: "/dashboard/messages",
          icon: BsFillChatLeftDotsFill,
          active:
            pathname == "/dashboard/messages"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Students",
          id: 5,
          url: "/dashboard/students",
          icon: BsMenuButton,
          active:
            pathname == "/dashboard/students"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Assignments",
          id: 6,
          url: "/dashboard/assignment/all-assignments",
          icon: AiOutlineTeam,
          active:
            pathname == "/dashboard/assignment/all-assignments" ||
            pathname === "/dashboard/assignment-creation" ||
            pathname === "/dashboard/assignment/submitassignment" ||
            pathname === "/dashboard/assignmentmarking/[id]" ||
            pathname === "/dashboard/assignment/submit-assignment" ||
            pathname === "/dashboard/assignment/edit/[id]" ||
            pathname === "/dashboard/assignments/[singleAssignment]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          children: [
            {
              name: "Assignment-creation",
              url: "/dashboard/assignment-creation",
              active:
                pathname == "/dashboard/assignment-creation"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
            {
              name: "All submitted assignments",
              url: "/dashboard/assignment/all-assignments",
              active:
                pathname == "/dashboard/assignment/all-assignments"
                  ? "!border-[#3A57E8] !text-[#3A57E8]"
                  : "",
            },
          ],
        },
        {
          name: "Live Class",
          id: 7,
          url: "/dashboard/live-class-with-screen",
          icon: VscDeviceCameraVideo,
          active:
            pathname == "/dashboard/live-class-with-screen"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
      ].map((single, idx) => <Item key={idx} item={single} />)
    
    : ["student", "admitted"].every(role => roles?.includes(role))
    ? [
        {
          name: "Dashboard",
          id: 1,
          url: "/dashboard",
          icon: AiOutlineAppstore,
        },
        {
          name: "My Courses",
          id: 2,
          url: "/dashboard/my-course",
          icon: AiOutlineUser,
          active:
            pathname == "/dashboard/my-course" ||
            pathname === "/dashboard/my-course/[id]" ||
            pathname == "/dashboard/page-overview/[id]"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Messages",
          id: 5,
          url: "/dashboard/messages",
          icon: BsFillChatLeftDotsFill,
          active:
            pathname == "/dashboard/messages"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
        {
          name: "Live Class",
          id: 7,
          url: "/dashboard/live-class-with-screen",
          active:
            pathname == "/dashboard/live-class-with-screen"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
          icon: VscDeviceCameraVideo,
        },
        {
          name: "Grades",
          id: 8,
          url: "/dashboard/students/grade",
          icon: MdNoteAdd,
          active:
            pathname == "/dashboard/students/grade"
              ? "!border-[#3A57E8] !text-[#3A57E8]"
              : "",
        },
      ].map((single, idx) => <Item key={idx} item={single} />)
      : ["student"].every(role => roles?.includes(role))
      ? [
          {
            name: "Take Admission",
            url: "/dashboard/take-admission",
            id: 0,
            icon: AiOutlineAppstore,
            active:
              pathname == "/dashboard/take-admission"
                ? "!border-[#3A57E8] !text-[#3A57E8]"
                : "",
          },
          {
            name: "Dashboard",
            id: 1,
            url: "/dashboard",
            icon: AiOutlineAppstore,
            active:
              pathname == "/dashboard"
                ? "!border-[#3A57E8] !text-[#3A57E8]"
                : "",
          },
        ].map((single, idx) => <Item key={idx} item={single} />)
        :null // Ensure a fallback case is provided
}
        </div>
        <div className="border-b mt-4 w-full px-5"></div>

        {/* other section */}
        <div className="px-5 pt-3">
          <h3 className="text-[#232D42] font-semibold uppercase">Other</h3>
        </div>
        <div className="">
          {[
            {
              name: "Sign Out",
              id: 1,
              Icons: AiOutlineLogout,
              clickHandler: logoutHandler,
            },
            { name: "Help", id: 2, Icons: AiOutlineInfoCircle },
          ].map(({ name, id, Icons, clickHandler }) => (
            <div
              key={id}
              className="border-l-2 border-[#8A92A6] hover:border-[#3A57E8] px-10 py-2 flex justify-between items-center text-[#8A92A6] hover:text-[#3A57E8] group/item"
            >
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={clickHandler}
              >
                <Icons className="h-5 w-5" />
                <h4 className="text-[16px] font-medium  ">{name}</h4>
              </div>
              <ChevronRightIcon className="h-5 w-5  group-hover/item:text-gray-700 invisible group-hover/item:visible" />
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
          className="rounded-full bg-blue-800 text-white text-center inline-block w-10 h-10 font-semibold mt-3 absolute left-2 cursor-pointer"
        >
          <AiOutlineArrowRight className="text-lg inline-block" />
        </button>
      )}
      {/* <MobileAsideBar /> */}
    </>
  );
};

export default AsideBar;

const Item = ({ item }: any) => {
  const [show, setShow] = useState(false);
  return item.children ? (
    <IlearnDropdown dropdowns={item.children} option={item} />
  ) : (
    <Link href={item.url}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={`${item.active} border-l-2 border-[#fff] hover:border-[#3A57E8] px-10 py-2 flex justify-between items-center text-[#8A92A6] hover:text-[#3A57E8] group/item cursor-pointer`}
      >
        <div className="flex items-center gap-2">
          <item.icon className="w-5 h-5" />
          <h4 className="text-[16px] font-medium  ">{item.name}</h4>
        </div>
        {show && <ChevronRightIcon className="h-5 w-5" />}
      </span>
    </Link>
  );
};
export const IlearnDropdown = (props: {
  dropdowns: { name: string; url: string; active: string }[];
  option: { name: string; url: string; id: number; icon: any; active: string };
}) => {
  const { dropdowns, option } = props;
  return (
    <Disclosure as="div" className="" defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full  justify-between items-center  text-left text-[#8A92A6] hover:text-[#3A57E8] cursor-pointer px-10 py-2">
            <div className="flex justify-between items-center  gap-2">
              <option.icon className="w-5 h-5" />

              <h1 className=" ">{option.name}</h1>
            </div>
            <span className=" ">
              {open ? (
                <MdOutlineKeyboardArrowDown className="w-6 h-6" />
              ) : (
                <MdOutlineKeyboardArrowUp className="w-6 h-6" />
              )}
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className=" flex flex-col justify-center items-left w-full pl-[70px] text-[#8A92A6] hover:text-[#3A57E8]cursor-pointer mt-[10px]">
            {dropdowns.map((dropdown) => (
              <div
                className={`${dropdown?.active} mb-[10px] text-[#8A92A6] hover:text-[#3A57E8] cursor-pointer text-[14px]`}
                key={dropdown.name}
              >
                <Link href={dropdown.url}>{dropdown.name}</Link>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
