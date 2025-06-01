import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AssignmentPhoto from "../../../../../assets/admin/pexels-flo-dahm-699459 1.png";
import Image from "next/image";
import { useSingleAssignmentQuery } from "../../../../../feature/api/dashboardApi";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";
import moment from "moment";
import { GoFile } from "react-icons/go";
import Link from "next/link";
import DeleteAssignment from "./DeleteAssignment";

export default function OnePageAssignment() {
  const router = useRouter();
  const id = router.query.singleAssignment;
  const { data, isSuccess, isError, isLoading } = useSingleAssignmentQuery(id);
  const [modalAssignment, setmodalAssignment] = useState(false);

  const handleCloseRejectAssignmentModal = () => {
    setmodalAssignment(false);
  };

  //console.log(id)
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        isSuccess && (
          <div className="p-5 font-nunito">
            <DeleteAssignment
              id={id}
              show={modalAssignment}
              handleClose={handleCloseRejectAssignmentModal}
              title="Are you sure you want to Delete this assignment?"
              successMessage="Delete Assignment Successfully!"
            />
            <div className="flex justify-between items-center mb-[20px] xsm:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
              <div>
                <h1 className="font-bold text-lg">
                  {data?.data?.assignment?.name}
                </h1>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <button
                    type="submit"
                    onClick={() => setmodalAssignment(true)}
                    className="flex hover:bg-red-500 text-white bg-red-700 hover:text-white border border-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  px-3  py-2 text-center "
                  >
                    Delete
                  </button>
                </div>
                <div className="mx-[10px]">
                  <Link
                    href={`/dashboard/assignment/edit/[id]`}
                    as={`/dashboard/assignment/edit/${id}`}
                  >
                    <button
                      type="submit"
                      className="flex bg-[#EBEEFD]  hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                    >
                      <MdEdit className="mt-[3px]" />
                      <span>Edit</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="border-2 border-gray-400 rounded-l-md rounded-r-md p-5">
                <p
                  className="text-[#8A92A6]"
                  dangerouslySetInnerHTML={{
                    __html: data?.data.assignment.description,
                  }}
                ></p>
                <div>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href= {`https://docs.google.com/gview?url=${data?.data?.assignment?.fileUrl}`}
                    className="cursor-pointer flex items-center"
                  >
                    <GoFile className="text-[3rem] text-blue-500 mt-2" />
                    <span className="text-sm text-[#8A92A6]">
                      {data.data.assignment.key}
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex w-[60%] justify-between mt-[20px] mb-[40px] xl:flex-row lg:flex-row md:flex-row sm:flex-col xsm:flex-col">
                <p>
                  <span className="font-bold">Points:</span>
                  {data?.data?.assignment?.score}
                </p>
                <p>
                  <span className="font-bold">Submitting:</span>a website url or
                  a file upload
                </p>
              </div>
              <div>
                <div className="flex justify-around items-start  xl:flex-row lg:flex-row md:flex-row sm:flex-col xsm:flex-col">
                  <p className="font-bold">For</p>
                  <p className="font-bold text-center">Due</p>
                  <p className="font-bold text-center">Available from</p>
                  <p className="font-bold">Until</p>
                </div>
                <div className="h-[2px] w-full bg-slate-400 my-[5px]"></div>
                <div className="flex justify-around xsm:items-start sm:items-start md:items-end lg:items-end xl:items-end  xl:flex-row lg:flex-row md:flex-row sm:flex-col xsm:flex-col">
                  <p>
                    {moment(data?.data?.assignment?.createdAt).format(
                      "MM/DD/YYYY"
                    )}
                  </p>
                  <p>Everyone</p>
                  <p>
                    {moment(data?.data?.assignment?.availFrom).format(
                      "MM/DD/YYYY"
                    )}
                  </p>
                  <p>
                    {moment(data?.data?.assignment?.availUntil).format(
                      "MM/DD/YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
