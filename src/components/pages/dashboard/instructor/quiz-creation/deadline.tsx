import React from "react";

export default function Deadline() {
  return (
    <div className="bg-white flex mt-5  flex-col px-5 py-7">
      <div className="flex justify-between items-center">
        <div className="my-8">
          <label htmlFor="available mb-2" className="font-semibold">
            Start Date
          </label>
          <br />
          <input
            className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
            type="date"
            id="available"
          />
        </div>
        <div className=" lg:ml-0 ml-5">
          <label htmlFor="until " className="font-semibold mb-2">
            Start Time
          </label>
          <br />

          <input
            className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
            type="time"
            id="until"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="until " className="font-semibold mb-2">
          Time Allowed
        </label>
        <br />

        <input
          className="border border-blue-400 rounded-lg px-5 py-2 text-blue-500"
          type="time"
          id="until"
        />
      </div>
    </div>
  );
}
