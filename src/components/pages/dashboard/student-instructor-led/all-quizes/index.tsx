/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import file from "../../../../../assets/dashboard/Paper.png";
import File from "../../../../../Icon/File";
import Image from "next/image";
import { Button, Spinner } from "flowbite-react";
import {
  useGetAllSubmittedQuizOfAnStudentQuery,
  useGetMyEnrollmentAllQuery,
} from "../../../../../feature/api/dashboardApi";
import { useAppSelector } from "../../../../../app/hooks";
import Link from "next/link";

export default function Allquizes() {
  const {
    user: { id },
    refresh,
  } = useAppSelector((state: any) => state.auth);

  //const { data:enrollData, isSuccess:enrollSuccess, isError:enrollError, isLoading:enrollLoading } = useGetMyEnrollmentAllQuery({});
  const { data, isSuccess, isError, isLoading } =
    useGetAllSubmittedQuizOfAnStudentQuery(id);

  //console.log(data);
  return (
    <div className="grid grid-cols-12 gap-4 font-nunito bg-gray-bg min-h-[100vh]">
      <div className="col-span-12 lg:col-span-12">
        <div className="flex flex-wrap items-center ">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : isError ? (
            <div>Network Error...</div>
          ) : isSuccess && data?.data?.subQuizzes?.length > 0 ? (
            data?.data?.subQuizzes?.map((val: any) => (
              <QuizCard item={val} courseId={val.course} key={val._id} />
            ))
          ) : (
            <div>No quiz found</div>
          )}
        </div>
      </div>
    </div>
  );
}
const QuizCard = ({ item, courseId }: { item: any; courseId: any }) => {
  //  console.log(item,courseId)
  const totalPercentage = item.percent;
  const stringPercentage = totalPercentage.toString();
  return (
    <div className="bg-white  rounded-xl flex flex-col max-w-[200px] min-w-[200px] max-h-[300px] min-h-[300px] ml-[10px]  p-[40px] mt-[20px] lg:mt-[30px]">
      <div className="flex items-center">
        <div className="bg-gray-300 relative h-[10px] w-full rounded-2xl my-[10px]">
          <div
            style={{
              width: stringPercentage + "%",
            }}
            className={`bg-green-400 absolute top-0 left-0 h-full  rounded-2xl`}
          ></div>
        </div>
        <div className="ml-[5px]">{item.percent}%</div>
      </div>

      <div className="w-full flex justify-center items-center">
        {/* <Image src={file} width={"48px"} height={"41px"} alt="" /> */}
        <File width={"48px"} height={"41px"} color="blue" fill="blue" />
      </div>
      <div className="text-center my-[10px]">
        <h3>{item?.quiz?.title}</h3>
      </div>
      <div className="text-blue-700 mb-[40px]">{/* <p>{time}</p> */}</div>
      <div className="flex justify-center items-center">
        <button className="btn bg-blue-600 text-white px-5 rounded py-2 text-sm">
          {item.percent === 100 ? (
            "complete"
          ) : (
            <Link
              href={"/dashboard/quiz/[courseId]/[quiz]"}
              as={`/dashboard/quiz/${courseId}/${item?.quiz?._id}`}
            >
              Take Test
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};
