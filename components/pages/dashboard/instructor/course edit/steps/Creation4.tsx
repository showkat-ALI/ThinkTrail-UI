import React from "react";
import Link from "next/link";

const Creation4 = () => {
  return (
    <>
      <div>
        <div className="">
          <div className="text-center w-full m-auto mb-56">
            <h2 className="font-semibold text-[1.4rem]">
              Your course has been updated successfully.
            </h2>
            <p className="text-[#8A92A6] font-medium text-sm mt-5 mb-12">
              Course successfully updated and awaiting admin approval. Expect a
              confirmation email soon.
            </p>
            <Link href={`/dashboard`}>
              <button className="bg-[#3A57E8] text-[#fff] py-3 px-3 text-sm font-normal rounded-sm">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creation4;
