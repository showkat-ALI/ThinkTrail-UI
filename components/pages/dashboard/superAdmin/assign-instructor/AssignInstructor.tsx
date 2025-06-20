"use client"
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { IoMdPersonAdd } from "react-icons/io";

import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllFacultiesQuery,
} from "../../../../../feature/api/dashboardApi";
import DeleteMentoring from "./InstructorAssign";
import AssignAdminModel from "../../../../common/assignAdmin/assignAdmin";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import AssignInstructorModal from "../../../../common/assignInstructor/AssignInstructor";

interface IStudentProps {
  student: any;
  show: boolean;
  setShow: (show: boolean) => void;
  handleClose: () => void;
  setmentorId: any;
  AllDepartments: any;
}

const AssignInstructors = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetAllAcademicFacultiesQuery({});
  const {
    data: AllDepartments,
    isLoading: AlldepisLoading,
    isError: AlldeptisError,
    isSuccess: AlldeptisSuccess,
  } = useGetAllFacultiesQuery({});
  console.log(data);
  const [show, setShow] = useState<boolean>(false);
  const [mentorId, setmentorId] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  let allAdmin;
  console.log(data);
  return (
    <>
      <div
        className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12`}
      >
        {show && (
          <AssignInstructorModal
            show={show}
            handleClose={handleClose}
            _id={mentorId}
            setShow={setShow}
            Alldepartments={AllDepartments}
            AlldeptisError={AlldeptisError}
            AlldepisLoading={AlldepisLoading}
            AlldeptisSuccess={AlldeptisSuccess}
          />
        )}
        <table className="w-full text-[16px] md:text-[18px] text-left">
          <thead className="text-[#ADB5BD] font-nunito">
            <tr>
              <th scope="col" className="py-3 px-6 font-nunito">
                Faculty Name
              </th>
              <th scope="col" className="py-3 px-6 font-nunito ">
                Department Name
              </th>
              <th scope="col" className="py-3 px-6 font-nunito">
                Semester
              </th>

              <th scope="col" className="py-3 px-6 text-center font-nunito">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[#232D42]">
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error...</div>
            ) : isSuccess && data?.data && data?.data.length > 0 ? (
              data?.data.map((student: any, idx: any) => (
                <Table
                  key={idx}
                  student={student}
                  show={show}
                  setShow={setShow}
                  handleClose={handleClose}
                  setmentorId={setmentorId}
                  AllDepartments={AllDepartments}
                />
              ))
            ) : (
              <div>No Admin found</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignInstructors;

function Table({
  student,
  show,
  setShow,
  handleClose,
  setmentorId,
}: IStudentProps) {
  const { academicDepartment, name, _id, assignedFaculty } = student;
  const [modalDelete, setmodalDelete] = useState(false);
  const [deleteMentorId, setdeleteMentorId] = useState("");
  const handleMentorView = (id: any) => {
    setShow(true);
    setmentorId(id);
  };

  const handleDelete = (id: any) => {
    setmodalDelete(true);
    setdeleteMentorId(id);
  };
  const handleCloseRejectAssignmentModal = () => {
    setmodalDelete(false);
  };
  return (
    <>
      <DeleteMentoring
        id={deleteMentorId}
        show={modalDelete}
        handleClose={handleCloseRejectAssignmentModal}
        title="Are you sure you want to Delete this Mentor?"
        successMessage="Delete mentor Successfully!"
      />
      <tr className="border-b font-nunito">
        <td scope="row" className="py-4 px-6">
          <div className="flex items-center space-x-2 justify-center">
            <div>
              <h2 className="text-[16px] md:text-[18px] text-[#232D42] font-medium  font-nunito">
                {name}
              </h2>
            </div>
          </div>
        </td>
        <td className="py-4 px-6 font-nunito">{academicDepartment?.name}</td>
        <td className="py-4 px-6 font-nunito">
          {academicDepartment?.academicSemester?.name}-{" "}
          {academicDepartment?.academicSemester?.year}
        </td>

        <td className="py-4 px-6">
          <div className="flex justify-center space-x-6">
            {assignedFaculty ? (
              <div className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]">
                <IoCheckmarkDoneCircleSharp />
              </div>
            ) : (
              <button
                onClick={() => handleMentorView(_id)}
                className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8] "
              >
                <IoMdPersonAdd />
              </button>
            )}

            <button
              onClick={() => handleDelete(_id)}
              className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8] "
            >
              <AiOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
