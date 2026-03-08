import React, { useEffect, useMemo, useState } from "react";
import { Modal, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { useAssignAFacultytoAcademicFacultyMutation } from "../../../feature/api/dashboardApi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import responsiveStyle from "../../../styles/GeneralStyles.module.css";

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

interface IFaculty {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  createdAt: string;
  contactNo: string;
  _id: string;
  designation: string;
  isAssigned: boolean;
}

const AssignInstructorModal = ({
  show,
  handleClose,
  _id,
  Alldepartments,
  AlldeptisError,
  AlldeptisSuccess,
  AlldepisLoading,
}: IModalProps) => {
  const [assignFaculty, assignState] =
    useAssignAFacultytoAcademicFacultyMutation();

  const [assignedLocally, setAssignedLocally] = useState<
    Record<string, boolean>
  >({});
  const [assigningFacultyId, setAssigningFacultyId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!show) {
      setAssigningFacultyId(null);
    }
  }, [show]);

  const facultyList: IFaculty[] = useMemo(
    () => Alldepartments?.data || [],
    [Alldepartments],
  );

  const handleAssign = async (facultyId: string) => {
    if (!facultyId || !_id || assignState.isLoading) return;

    // Optimistic update so first click feels instant.
    setAssignedLocally((prev) => ({ ...prev, [facultyId]: true }));
    setAssigningFacultyId(facultyId);

    try {
      await assignFaculty({
        id: _id,
        body: { assignedFaculty: facultyId },
      }).unwrap();
      toast.success("Instructor assigned successfully");
    } catch (error: any) {
      // Roll back optimistic state if request fails.
      setAssignedLocally((prev) => ({ ...prev, [facultyId]: false }));
      toast.error(error?.data?.message || "Assign failed");
    } finally {
      setAssigningFacultyId(null);
    }
  };

  return (
    <div className="font-nunito">
      <Modal
        show={show}
        popup={true}
        onClose={handleClose}
        size="4xl"
        className="overflow-auto"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="max-h-[500px] md:max-h-[500px] md:max-w-[900px] max-w-[800px] overflow-auto">
            <div
              className={`${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12`}
            >
              <table className="w-full text-[16px] md:text-[18px] text-left">
                <thead className="text-[#ADB5BD] font-nunito">
                  <tr>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
                      ID
                    </th>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
                      Faculty Name
                    </th>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
                      Contact NO.
                    </th>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
                      Designation
                    </th>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
                      Gender
                    </th>
                    <th scope="col" className="py-3 px-[0.5rem] font-nunito">
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
                  {AlldepisLoading && (
                    <tr>
                      <td className="py-4 px-[0.5rem]" colSpan={7}>
                        Loading faculties...
                      </td>
                    </tr>
                  )}

                  {AlldeptisError && (
                    <tr>
                      <td className="py-4 px-[0.5rem]" colSpan={7}>
                        Failed to load faculties
                      </td>
                    </tr>
                  )}

                  {AlldeptisSuccess && facultyList.length === 0 && (
                    <tr>
                      <td className="py-4 px-[0.5rem]" colSpan={7}>
                        No available instructor found
                      </td>
                    </tr>
                  )}

                  {AlldeptisSuccess &&
                    facultyList.length > 0 &&
                    facultyList.map((faculty) => (
                      <FacultyRow
                        key={faculty._id}
                        faculty={faculty}
                        onAssign={handleAssign}
                        isAssigning={
                          assignState.isLoading &&
                          assigningFacultyId === faculty._id
                        }
                        isAssigned={
                          Boolean(faculty.isAssigned) ||
                          Boolean(assignedLocally[faculty._id])
                        }
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

interface IFacultyRowProps {
  faculty: IFaculty;
  onAssign: (facultyId: string) => void;
  isAssigning: boolean;
  isAssigned: boolean;
}

function FacultyRow({
  faculty,
  onAssign,
  isAssigning,
  isAssigned,
}: IFacultyRowProps) {
  const { id, fullName, email, gender, contactNo, _id, designation } = faculty;

  return (
    <tr className="border-b font-nunito text-[16px]">
      <td scope="row" className="py-4 px-[0.5rem]">
        <div className="flex items-center space-x-2 justify-center">
          <h2 className="text-[16px] md:text-[16px] text-[#232D42] font-medium font-nunito">
            {id}
          </h2>
        </div>
      </td>

      <td className="py-4 px-[0.5rem] font-nunito">{fullName}</td>
      <td className="py-4 px-[0.5rem] font-nunito">{contactNo}</td>
      <td className="py-4 px-[0.5rem] font-nunito">{designation}</td>
      <td className="py-4 px-[0.5rem] font-nunito">{gender}</td>
      <td className="py-4 px-[0.5rem] font-nunito">{email}</td>

      <td className="py-4 px-6">
        <div className="flex justify-center space-x-6">
          {isAssigned ? (
            <div className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]">
              <IoCheckmarkDoneCircleSharp />
            </div>
          ) : (
            <button
              onClick={() => onAssign(_id)}
              className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]"
              disabled={isAssigning}
            >
              {isAssigning ? <Spinner size="sm" /> : <IoMdPersonAdd />}
            </button>
          )}

          <button
            className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8]"
            type="button"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AssignInstructorModal;
