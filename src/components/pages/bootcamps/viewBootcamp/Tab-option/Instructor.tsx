import React from "react";
import Image from "next/image";

const Instructor = ({ course }: { course: any }) => {
  return (
    <div className="font-nunito">
      <div>
        <div>
          <div className="grid grid-cols-12 md:gap-5">
            <div className="col-span-5">
              <div className="rounded-md">
                <Image
                  src={course.avatar}
                  width={200}
                  height={140}
                  layout="responsive"
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-7">
              <div>
                <h3 className="font-bold text-2xl">{course.firstName}</h3>
                <p className="text-sm text-[#747579]">
                  Instructor of Marketing
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            {
              //<h5 className='text-xl font-bold'>Course Description</h5>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
