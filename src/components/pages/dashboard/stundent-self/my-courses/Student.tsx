import Image from "next/image";
import React from "react";
import { Calendar } from "react-calendar";
import CourseCard from "./CourseCard";
import HourSpent from "./HourSpent";
import Progress from "./Progress";
import CalendarIcon from "../../../../../assets/Calender.png";
import icon from "../../../../../assets/b.png";
import { useGetMyEnrollmentAllQuery } from "../../../../../feature/api/dashboardApi";

const Student = () => {
  const { isError, data, error, isLoading, isSuccess } =
    useGetMyEnrollmentAllQuery({});
  return (
    <>
      <div className="grid grid-cols-12 gap-8 font-nunito bg-gray-bg">
        <div className="col-span-12 xl:col-span-8">
          <div className="">
            <div className="flex justify-between mb-8">
              <h3 className="font-semibold text-xl">Your Courses</h3>
              <button className="bg-[#3A57E8] py-2 px-4 text-white rounded">
                View all
              </button>
            </div>
            <div
              className="flex justify-between gap-8 grid-flow-col overflow-x-auto h-[27rem] df"
              id="df"
              style={{ flexFlow: "column wrap" }}
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : isError ? (
                <div>Error...</div>
              ) : isSuccess &&
                data?.data?.enrollments &&
                data.data.enrollments.length > 0 ? (
                <>
                  {data.data.enrollments.map((item: any, i: any) => (
                    <CourseCard key={i} item={item} />
                  ))}
                </>
              ) : (
                <div>No Enrollments found</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-9">
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-[#fff] p-4 rounded">
                <HourSpent />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Progress />
            </div>
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-[#fff] p-4 rounded">
            <h3 className="font-medium text-xl">Calender</h3>
            <Calendar className="w-full" />
          </div>
          <div className="mt-6 bg-[#ffffff] p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[19px] font-medium">Upcoming Tasks</h3>
              <button className="bg-[#3A57E8] px-3 py-2 rounded text-white">
                view all
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#F9F9F9] p-4 rounded">
                <div>
                  <h4 className="text-lg font-medium">Machine Learning</h4>
                  <div className="flex justify-between text-[#3A57E8] mt-2">
                    <span>Days:3/23</span>
                    <span>10:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] p-4 rounded">
                <div>
                  <h4 className="text-lg font-medium">Machine Learning</h4>
                  <div className="flex justify-between text-[#3A57E8] mt-2">
                    <span>Days:3/23</span>
                    <span>10:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] p-4 rounded">
                <div>
                  <h4 className="text-lg font-medium">Machine Learning</h4>
                  <div className="flex justify-between text-[#3A57E8] mt-2">
                    <span>Days:3/23</span>
                    <span>10:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] p-4 rounded">
                <div>
                  <h4 className="text-lg font-medium">Machine Learning</h4>
                  <div className="flex justify-between text-[#3A57E8] mt-2">
                    <span>Days:3/23</span>
                    <span>10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-7">
            <div className="bg-[#3A57E8] text-white pt-[1.5rem] pb-[1.5rem] pl-[22px] w-full rounded">
              <div>
                <Image src={icon} alt="" />
              </div>

              <h1 className="font-medium text-[33px]">04</h1>
              <span>Weeks Practiced</span>
            </div>
            <div className="bg-[#08B1BA] text-white pt-[1.5rem] pb-[1.5rem] pl-[22px] w-full rounded">
              <div>
                <Image src={icon} alt="" />
              </div>

              <h1 className="font-medium text-[33px]">04</h1>
              <span>Weeks Practiced</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
