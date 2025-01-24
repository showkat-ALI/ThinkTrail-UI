import React from "react";

export default function QuizNaming() {
  return (
    <div className="grid grid-cols-12 items-center ">
      <div className="col-span-3">
        <p className="font-semibold text-base">Quiz Name </p>
      </div>
      <div className="col-span-7">
        <input
          type="text"
          className="mt-3"
          placeholder="enter courese time"
          style={{
            background: " #FFFFFF",
            boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
            borderRadius: "8px",
            width: "100%",
            border: "none",
            padding: " 11px 17px",
          }}
        />
      </div>
    </div>
  );
}
