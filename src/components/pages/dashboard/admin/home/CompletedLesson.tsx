import React from "react";

import style from "../../../../../styles/GeneralStyles.module.css";

const CompletedLesson = () => {
  return (
    <div className="bg-white rounded-xl py-4 px-3 flex flex-col mb-4">
      <h1 className="text-xl text-title-clr mb-3 font-bold">
        Completed Lessons
      </h1>

      <div className="flex flex-col">
        {[1, 2, 3].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center py-3 px-1 bg-transparent  md:flex-row md:max-w-xl hover:bg-gray-100"
          >
            <div>
              <p className="text-small-text-color font-bold text-xl">{i + 1}</p>
            </div>
            <div
              className={` w-full flex justify-end items-end p-2 mx-3 h-24 rounded-xl ${style.CompletedLesBg}`}
            >
              <div className="w-20 p-1 text-white flex justify-center items-center text-xs h-6 rounded-lg bg-indigo-900">
                01 : 20 : 30
              </div>
            </div>

            <p className=" text-small-text-color text-sm  ">
              Chapter {i}: Turning photographs into vector artwork
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedLesson;
