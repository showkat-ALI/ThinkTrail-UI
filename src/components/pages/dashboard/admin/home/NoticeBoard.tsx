import Image from "next/image";
import React from "react";
import notice1 from "../../../../../assets/admin/pexels-flo-dahm-699459 1.png";
import notice2 from "../../../../../assets/admin/pexels-oleg-magni-861233.png";
import notice3 from "../../../../../assets/admin/pexels-vanessa-garcia-6325984 1.png";

const NoticeBoard = () => {
  return (
    <div className="bg-white rounded-xl py-4 px-3 flex flex-col">
      <h1 className="text-xl text-title-clr mb-3 font-bold">Notice Board</h1>

      <div className="flex flex-col ">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="flex flex-col items-center py-3 px-2 bg-transparent rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 "
          >
            <Image
              width={60}
              height={80}
              className="rounded-xl"
              src={idx === 1 ? notice1 : idx === 2 ? notice2 : notice3}
              alt=""
            />
            <div className="flex flex-col px-3 justify-between leading-normal">
              <h5 className="mb-2 font-bold text-[1.15rem] tracking-normal font-semi-bold text-title-clr">
                Photography Contest on 12.4.21
              </h5>
              <p className="mb-3 font-normal text-sm text-small-text-color">
                Darrell Steward
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
