import Image from "next/image";
import React from "react";
import PrintIcon from "../../../../../assets/print.png";
import msgIcon from "../../../../../assets/msg.png";
import { Button } from "flowbite-react";
import {useAllAssignmentInstructorQuery} from "../../../../../feature/api/dashboardApi";
import { useAppSelector } from "../../../../../app/hooks";
import {Spinner} from "flowbite-react";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

const OneStudentAllGrades = () => {
  const router = useRouter();
  const{ id:thisisid} = router.query;
  const {id} =
  useAppSelector((state) => state.auth.user);
  const { data, isSuccess, isError, isLoading } = useAllAssignmentInstructorQuery(id);

  console.log(data)
  const studentScore = [
    {
      name: "Blah Blah blah blah",
      due: "Dec 28, 2015 by 11:59pm",
      missing: true,
      late: false,
      available: false,
      score: 20,
    },
    {
      name: "Blah Blah blah blah",
      due: "Dec 28, 2015 by 11:59pm",
      missing: false,
      late: true,
      available: false,
      score: 20,
    },
    {
      name: "Blah Blah blah blah",
      due: "Dec 28, 2015 by 11:59pm",
      missing: false,
      late: false,
      available: true,
      score: 20,
    },
  ];
  return (
    <>
      <div className="font-nunito min-h-[100vh]">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#fff] rounded">
            <div className="lg:p-5">
              <h1 className="font-bold text-xl">Grades for Test Student</h1>
              <div className="flex justify-between mb-6 xsm:gap-5 lg:gap-0 items-center flex-col lg:flex-row mt-[20px]">
                <div className="flex ">
                  <h3 className="font-semibold  ">Arrange by</h3>
                  <div className="mx-[20px]">
                    <select className="bg-white border rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500  w-full px-8 py-3 flex flex-col justify-between font-bold">
                      <option value="single-attempt">Due Date</option>
                      <option value="double-attempt">Over Date</option>
                      <option value="Five-attempts">Five attempts</option>
                    </select>
                  </div>
                  <div>
                    <Button>Apply</Button>
                  </div>
                </div>

                <button className="bg-[#EBEEFD] w-full lg:w-[135px] justify-center flex items-center gap-2 border-[1px] border-[#3A57E8] font-normal text-[15px] px-3 h-[41px] rounded">
                  <Image src={PrintIcon} width="17px" height="17px" alt="" />{" "}
                  Print grades
                </button>
              </div>
            </div>
            <div>
              <table className="table-fixed w-full max-h-[100vh] overflow-y-auto">
                <thead className="border-t border-b border-[#ADB5BD]">
                  <tr className="font-medium ">
                    <th className="py-3 bg-[#E3E3E3] text-left px-3 text-[16px] font-medium">
                      Name
                    </th>
                    <th className="py-3  bg-[#E3E3E3] text-[16px] font-medium">
                      Due
                    </th>
                    <th className="py-3 bg-[#E3E3E3] text-[16px] font-medium">
                      Status
                    </th>
                    <th className="py-3  bg-[#E3E3E3] text-[16px] font-medium">
                       Score
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black text-center">
                  {
                    isLoading ? <div className="flex justify-center items-center"><Spinner /></div> : isError ? <div>Error</div>: isSuccess &&
                    data.data.assignments.map((val:any) => (
                      <tr className="border-b" key={id}>
                      <td scope="row" className="py-4 px-6 font-nunito">
                        {val.name}
                      </td>
                      <td className="py-4 px-6 text-center font-nunito">
                        {moment(val.availUntil).format('MM/DD/YYYY')}
                      </td>

                      <td className="py-4 px-6 font-nunito">
                        <button
                          className={`rounded-xl px-2 py-1 text-[12px] font-nunito
                        ${
                          val?.submissions[0]?.student?._id ===  thisisid ? "text-white" : "text-[#3A57E8]"
                        } 
                        ${
                          val?.submissions[0]?.student?._id ===  thisisid ? "bg-[#3A57E8]" : "bg-[#EBEEFD]"
                        } 
                        `}
                        >
                          {val?.submissions[0]?.student?._id ===  thisisid
                            ? "available"
                            : "missing"
                          }
                        </button>
                      </td>
                      <td className="py-4 px-6 font-nunito">{val?.submissions[0]?.student?._id ===  thisisid ? val?.submissions[0]?.mark : "#"}</td>
                    </tr>
                    ))
                  }
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneStudentAllGrades;
