import React, { useState, useMemo } from "react";
import Camera from "../../../../../Icon/Camera";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
export default function Question() {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <p className="font-semibold text-base">Quiz Name </p>
          <button className="p-3 flex justify-between rounded-md border-blue-700 bg-[#EBEEFD]">
            <Camera />
            <p>Add Media</p>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 px-2  py-2.5 mr-2 mb-2"
          >
            Add new question
          </button>
        </div>
      </div>
      <div>
        <ReactQuill theme="snow" onChange={setValue} />
      </div>
    </div>
  );
}
