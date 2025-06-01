import Image from "next/image";
import React from "react";
import av1 from "../../../../../assets/images/avatars/06.png";
import av2 from "../../../../../assets/images/avatars/07.png";
import av3 from "../../../../../assets/images/avatars/08.png";
import av4 from "../../../../../assets/images/avatars/09.png";
import calenderLogo from "../../../../../assets/Iconly/DualTone/Calendar.svg";
import { IoCalendar } from "react-icons/io5";

const GroupDiscussion = () => {
  return (
    <div className="max-w-full p-6 bg-white rounded-lg  mt-3">
      <div>
        <h5 className="text-xl text-title-clr mb-3 font-bold">
          Group Discussion
        </h5>
      </div>
      <div>
        <h5 className="mb-2 text-xl font-bold  text-blue-500 ">Jane Cooper</h5>
        <p className="mb-2 text-lg text-small-text-color ">
          Chief Instructor of Design & Ethics
        </p>
      </div>
      <p className="my-5 font-normal text-small-text-color">Participants</p>
      <div className="flex -space-x-1 my-4">
        <div className="w-9 h-9  ">
          <Image
            width="100%"
            height="100%"
            className="rounded-full border-2 border-white dark:border-gray-800"
            src={av1}
            alt=""
          />
        </div>
        <div className="w-9 h-9 ">
          <Image
            width="100%"
            height="100%"
            className="rounded-full border-2 border-white dark:border-gray-800"
            src={av2}
            alt=""
          />
        </div>
        <div className="w-9 h-9 ">
          <Image
            width="100%"
            height="100%"
            className="rounded-full border-2 border-white dark:border-gray-800"
            src={av3}
            alt=""
          />
        </div>
        <div className="w-9 h-9 ">
          <Image
            width="100%"
            height="100%"
            className="rounded-full border-2 border-white dark:border-gray-800"
            src={av4}
            alt=""
          />
        </div>
        <div className="">
          <a
            className="flex  justify-center items-center w-9 h-9 text-sm font-medium text-white bg-indigo-600  rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
            href="#"
          >
            99+
          </a>
        </div>
      </div>
      <hr className="text-small-text-color mb-3 h-5 " />
      <div className="w-full flex justify-between">
        <div className="flex items-center justify-between ">
          <IoCalendar className="text-arrow-btn w-6 mr-4 h-6" />
          <p className="text-small-text-color">18 Dec 2020</p>
        </div>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          BROWSE
        </a>
      </div>
    </div>
  );
};

export default GroupDiscussion;
