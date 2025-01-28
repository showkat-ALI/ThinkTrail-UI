import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import {
  useAssignAdminMutation,
  useAssignAFacultytoAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
  useGetAllFacultiesQuery,
  useGetOneMentoringQuery,
  useUpdateOneMetoringMutation,
} from "../../../feature/api/dashboardApi";
import { useForm } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import responsiveStyle from "../../../styles/GeneralStyles.module.css";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  _id: string;
  setShow: (show: boolean) => void;
  Alldepartments: any;
  AlldeptisError: any;
  AlldeptisSuccess: any;
  AlldepisLoading: any;
}
type IuserData = {
  firstName: string;
  email: string;
  interest: string;
  createdAt: string;
};
let adminID: string;

const AssignInstructorModal = ({
  show,
  handleClose,
  _id,
  setShow,
  Alldepartments,
  AlldeptisError,
  AlldeptisSuccess,
  AlldepisLoading,
}: IModalProps) => {
  console.log(Alldepartments);
  adminID = _id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IuserData>();

  //  console.log(id);
  const [
    updateMentoring,
    {
      data: updateMentoringDate,
      isSuccess: updateMentoringSuccess,
      isError: updateMentoringError,
      isLoading: updateMentoringLoading,
      error: updateMentoringerror,
    },
  ] = useUpdateOneMetoringMutation();
  const { data, isSuccess, isError, isLoading } = useGetAllFacultiesQuery({});
  console.log("all faculties", data);
  const UpdateUserData = (data: IuserData) => {
    const { firstName, email, createdAt, interest } = data;
    updateMentoring({
      id: _id,
      firstName: firstName,
      email: email,
      createdAt: createdAt,
      interest: interest,
    });
  };
  useEffect(() => {
    if (updateMentoringError) {
      toast.error((updateMentoringerror as any).data.message);
    } else if (updateMentoringSuccess) {
      toast.success("User Updated Successfully");
      setShow(false);
    }
  }, [updateMentoringError, updateMentoringSuccess]);
  return (
    <>
      <div className="font-nunito">
        <Modal
          show={show}
          popup={true}
          onClose={handleClose}
          size="4xl"
          className="overflow-auto "
        >
          <Modal.Header />
          <Modal.Body>
            <div className="max-h-[500px] md:max-h-[500px] md:max-w-[900px] max-w-[800px] overflow-auto">
              <>
                <div
                  className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12`}
                >
                  <table className="w-full text-[16px] md:text-[18px] text-left">
                    <thead className="text-[#ADB5BD] font-nunito">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito"
                        >
                          Faculty Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito "
                        >
                          Contact NO.
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito"
                        >
                          Designation
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito"
                        >
                          Gender
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] font-nunito"
                        >
                          Email
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-[0.5rem] text-center font-nunito"
                        >
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
                          />
                        ))
                      ) : (
                        <span>No available instructor found</span>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AssignInstructorModal;
interface IStudentProps {
  student: {
    id: string;
    fullName: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    createdAt: string;
    contactNo: string;
    _id: string;
    designation: string;
    isAssigned: boolean;
  };
  show: boolean;
  setShow: (show: boolean) => void;
  handleClose: () => void;
}

function Table({ student, show, setShow, handleClose }: IStudentProps) {
  console.log("adminID", adminID);

  const [
    assignAdmin,
    {
      data: assignAdminData,
      isSuccess: assignAdminIsSuccess,
      isError: assignAdminIsError,
      isLoading: assignAdminIsLoading,
      error: assignAdminError,
    },
  ] = useAssignAFacultytoAcademicFacultyMutation();
  useEffect(() => {
    if (assignAdminError) {
      toast.error((assignAdminError as any).data?.message);
    } else if (assignAdminIsSuccess) {
      toast.success("Successfully added Admin!!");
    }
  }, [
    assignAdminIsLoading,
    assignAdminIsSuccess,
    assignAdminData,
    assignAdminError,
  ]);
  const {
    id,
    fullName,
    email,
    gender,
    dateOfBirth,
    createdAt,
    contactNo,
    _id,
    designation,
    isAssigned,
  } = student;
  console.log("single faculty ", student);
  const date = new Date(createdAt).toLocaleDateString();
  const [modalDelete, setmodalDelete] = useState(false);
  const [deleteMentorId, setdeleteMentorId] = useState("");
  const handleMentorView = (id: any) => {
    setShow(true);
  };

  const handleDelete = (id: any) => {
    setmodalDelete(true);
    setdeleteMentorId(id);
  };
  const handleCloseRejectAssignmentModal = () => {
    setmodalDelete(false);
  };
  const [active, setActive] = useState(false);
  return (
    <>
      <tr className="border-b font-nunito text-[16px]">
        <td scope="row" className="py-4 px-[0.5rem]">
          <div className="flex items-center space-x-2 justify-center">
            <div>
              <h2 className="text-[16px] md:text-[16px] text-[#232D42] font-medium  font-nunito">
                {id}
              </h2>
            </div>
          </div>
        </td>
        <td className="py-4 px-[0.5rem] font-nunito">{fullName}</td>
        <td className="py-4 px-[0.5rem] font-nunito">{contactNo}</td>
        <td className="py-4 px-[0.5rem] font-nunito">{designation}</td>
        <td className="py-4 px-[0.5rem] font-nunito">{gender}</td>
        <td className="py-4 px-[0.5rem] font-nunito">{email}</td>

        <td className="py-4 px-6">
          <div className="flex justify-center space-x-6">
            {active || isAssigned ? (
              <div className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]">
                <IoCheckmarkDoneCircleSharp />
              </div>
            ) : (
              <button
                onClick={() => {
                  assignAdmin({
                    id: adminID,
                    body: { assignedFaculty: `${_id}` },
                  });
                  setActive(true);
                }}
                className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]"
              >
                {assignAdminIsLoading ? <Spinner /> : <IoMdPersonAdd />}
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
