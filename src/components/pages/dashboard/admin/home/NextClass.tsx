import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";

const NextClass = () => {
  const [value, onChange] = useState(new Date());
  const [selected, setSelected] = useState(false);
  return (
    <>
      <div className=" mt-10 w-full grid grid-cols-12 p-3 gap-x-5 font-nunito rounded-lg bg-white content-center h-auto">
        <div className="col-span-12 sm:col-span-6">
          <h1 className="text-xl text-black mb-3 font-bold">
            Upcoming Classes
          </h1>
          <Calendar onChange={onChange} value={value} className="mx-auto" />
        </div>

        <div className="col-span-12 sm:col-span-6 mt-10 py-5">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className={`flex flex-col items-start py-4 px-0 justify-between  border rounded-lg shadow-md md:flex-row md:max-w-xl  bg-gray-bg ${
                idx === 1 ? "mb-4" : "mb-0"
              }`}
              onClick={() => setSelected(true)}
            >
              <div className="flex">
                <div
                  className={`${
                    idx === 1 ? "bg-violet-500" : "bg-transparent"
                  } w-1 h-11 rounded-t-xl rounded-b-xl mt-4  `}
                ></div>
                <div className="flex flex-col justify-between px-2  leading-normal">
                  <h1 className="text-small-text-color text-sm ">
                    Section 3: Chapter 4
                  </h1>
                  <h5 className="my-2 font-bold tracking-normal text-gray-500 dark:text-white">
                    Practice What you learn and apply for test
                  </h5>
                  <p className=" text-sm font-normal  text-small-text-color">
                    09:00 am- 10:30 am
                  </p>
                </div>
              </div>
              <div className="px-4">
                <HiOutlineDotsHorizontal />
              </div>
            </div>
          ))}

          {/* <p>{value.toDateString()}</p> */}
          <div className="flex items-center justify-center mt-5">
            <div className="w-7 h-7 rounded-full bg-arrow-btn-bg flex items-center justify-center">
              <RiArrowDropDownLine className="text-arrow-btn w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextClass;
