import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import {
  useGetAllAcademicDepartmentsQuery,
  useGetAllAdminsQuery,
  useGetAllMentoringsQuery,
} from "../../../../../feature/api/dashboardApi";
import MentoringViewModal from "../../../../common/mentoring-view/index";
import DeleteMentoring from "./DepartmentAssign";
import AssignAdminModel from "../../../../common/assignAdmin/assignAdmin";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

interface IStudentProps {
  student: any;
  show: boolean;
  setShow: (show: boolean) => void;
  handleClose: () => void;
  setmentorId: any;
  AllDepartments: any;
}

const AssignAdmin = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllAdminsQuery({});
  const {
    data: AllDepartments,
    isLoading: AlldepisLoading,
    isError: AlldeptisError,
    isSuccess: AlldeptisSuccess,
  } = useGetAllAcademicDepartmentsQuery({});
  console.log(data);
  const [show, setShow] = useState<boolean>(false);
  const [mentorId, setmentorId] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  let allAdmin;

  return (
    <>
      <div
        className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12`}
      >
        {show && (
          <AssignAdminModel
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
                Name
              </th>
              <th scope="col" className="py-3 px-6 font-nunito ">
                Email
              </th>
              <th scope="col" className="py-3 px-6 font-nunito">
                ID
              </th>

              <th scope="col" className="py-3 px-6 font-nunito">
                Send Mail
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

export default AssignAdmin;

function Table({
  student,
  show,
  setShow,
  handleClose,
  setmentorId,
}: IStudentProps) {
  const {
    email,
    name: { firstName },
    createdAt,
    _id,
    id,
    assignedDepartment,
  } = student;
  const date = new Date(createdAt).toLocaleDateString();
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
                {firstName}
              </h2>
            </div>
          </div>
        </td>
        <td className="py-4 px-6 font-nunito">{email}</td>
        <td className="py-4 px-6 font-nunito">{id}</td>
        <td className="py-4 px-6 font-nunito">
          <a
            href={` mailto: ${email} `}
            className="
          text-[16px] flex items-center space-x-1.5 text-white px-4 py-1.5 rounded bg-[#3A57E8] 
          "
          >
            <FaEnvelopeOpenText />
            <span>Email</span>
          </a>
        </td>
        <td className="py-4 px-6">
          <div className="flex justify-center space-x-6">
            {assignedDepartment ? (
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
