import React from "react";

const OverViewCard = ({ catagory }: { catagory: any }) => {
  const {
    id,
    name,
    number,
    logo,
  }: {
    id: number;
    name: string;
    number: number;
    logo: any;
  } = catagory;
  const CustuomLogo = logo;
  return (
    <div className="col-span-12 sm:col-span-6 2xl:col-span-3">
      <div className="h-28 bg-[#ffffff] flex flex-col rounded-lg border-0">
        <div className="px-3 py-2">
          <h1 className="text-gray-500">{name}</h1>
          <div className="flex justify-between items-center mt-6">
            <p className="font-bold text-2xl">{number}</p>
            <div className="">
              <CustuomLogo className="text-blue-700 h-7 w-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewCard;
