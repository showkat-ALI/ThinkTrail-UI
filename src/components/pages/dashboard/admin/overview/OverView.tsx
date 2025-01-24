import React from "react";
import OverViewCard from "../../../../common/overviewCard/OverViewCard";
import { FaPenSquare } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { BiTime } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { Dropdown } from "flowbite-react";
import {useGetAllEnrollmentInstructorQuery,useAllEnrollmentQuery } from "../../../../../feature/api/dashboardApi";
import {Spinner} from "flowbite-react";
import { useAppSelector } from "../../../../../app/hooks";

const OverView = () => {
  const { firstName,lastName,_id,roles } =
  useAppSelector((state) => state.auth.user);
  const { isError, data, error, isLoading, isSuccess } = useGetAllEnrollmentInstructorQuery(_id)
  const { isError:enrollIsError, data:enrollData, error:enrollError, isLoading:enrollLoading, isSuccess:enrollSuccess } = useAllEnrollmentQuery({})
  const allCatagory = [
    {
      id: 0,
      name: "Course in progress",
      number: isLoading ? <div><Spinner/></div>: roles.includes("instructor") ? data?.data?.enrollments?.length :  roles.includes("admin") && enrollLoading?   <div><Spinner/></div> : enrollData?.data?.enrollments?.length ,
      logo: FaPenSquare,
    },
    {
      id: 0,
      name: "Completed Courses",
      number: "10",
      logo: TiTick,
    },
    {
      id: 0,
      name: "Watching Time",
      number: "100",
      logo: BiTime,
    },
    {
      id: 0,
      name: "Certificates Achieved",
      number: "08",
      logo: AiFillStar,
    },
  ];
 
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Overview</h1>
        <div>
          <Dropdown label="Monthly" dismissOnClick={false}>
            <Dropdown.Item>Days</Dropdown.Item>
            <Dropdown.Item>Weeks</Dropdown.Item>
            <Dropdown.Item>Months</Dropdown.Item>
            <Dropdown.Item>Year</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-12  md:gap-x-8 lg:gap-x-8 xl:gap-x-8 sm:gap-x-0 xsm:gap-x-0 md:gap-y-8 lg:gap-y-8 xl:gap-y-8 sm:gap-y-5 xsm:gap-y-5">
        {allCatagory.map((catagory, idx) => (
          <OverViewCard key={idx} catagory={catagory} />
        ))}
      </div>
    </div>
  );
};

export default OverView;
