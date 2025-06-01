import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import { useGetAllOptimizesQuery } from "../../../../../feature/api/dashboardApi";
import Image from "next/image";
import OptimizationView from "./OptimizationView";
import DeleteOptimize from "./DeleteOptimize";
// fake data

interface IStudentProps {
  student: any;
  setoptimizeId: any;
  setShow: any;
}

function OptimizationTable() {
  const { data, isLoading, isError, isSuccess } = useGetAllOptimizesQuery({});
  const [optimizeId, setoptimizeId] = useState("");

  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div
        className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full mx-auto shadow-md sm:rounded-lg mt-12`}
      >
        {show && (
          <OptimizationView
            show={show}
            handleClose={handleClose}
            id={optimizeId}
            setShow={setShow}
          />
        )}
        <table className="w-full text-[16px] md:text-[18px] text-left">
          <thead className="text-[#ADB5BD] font-normal">
            <tr>
              <th scope="col" className="py-3 px-6">
                Profiles
              </th>
              <th scope="col" className="py-3 px-6 ">
                Contact
              </th>
              <th scope="col" className="py-3 px-6">
                Education
              </th>
              <th scope="col" className="py-3 px-6">
                LinkedIn URL
              </th>
              <th scope="col" className="py-3 px-6 ">
                Resume
              </th>
              <th scope="col" className="py-3 px-6 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[#232D42]">
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error...</div>
            ) : isSuccess &&
              data?.data?.optimize &&
              data.data.optimize.length > 0 ? (
              data.data.optimize.map((student: any, idx: any) => (
                <Table
                  key={idx}
                  student={student}
                  setoptimizeId={setoptimizeId}
                  setShow={setShow}
                />
              ))
            ) : (
              <div>no optimization found</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Table({ student, setoptimizeId, setShow }: IStudentProps) {
  const { url, message, linkedin, education, phone, firstName, email, _id } =
    student;

  const [modalDelete, setmodalDelete] = useState(false);
  const [deleteOptimizeId, setdeleteOptimizeId] = useState("");

  const handleOptimizeView = (id: any) => {
    setShow(true);
    setoptimizeId(id);
  };

  const handleDelete = (id: any) => {
    setmodalDelete(true);
    setdeleteOptimizeId(id);
  };

  const handleCloseRejectAssignmentModal = () => {
    setmodalDelete(false);
  };
  return (
    <>
      <DeleteOptimize
        id={deleteOptimizeId}
        show={modalDelete}
        handleClose={handleCloseRejectAssignmentModal}
        title="Are you sure you want to delete this optimization?"
        successMessage="Delete optimization Successfully!"
      />
      <tr className="border-b">
        <td scope="row" className="py-3 px-[0.6rem]">
          <div className="flex space-x-2">
            <div>
              <h2 className="text-[16px] md:text-[18px] text-[#232D42] font-medium font-nunito">
                {firstName}
              </h2>
              <p className="text-[12px] text-[#8A92A6] font-nunito">{email}</p>
            </div>
          </div>
        </td>
        <td className="py-4 px-6 font-nunito">{phone}</td>
        <td className="py-4 px-6 font-nunito">{education}</td>
        <td className="py-4 px-6 font-nunito">
          <a href={linkedin}>{linkedin}</a>
        </td>
        <td className="py-4 px-6">
          <a
            target="_blank"
            href={url}
            className="text-[16px] flex items-center space-x-1.5 text-white px-4 py-1.5 rounded bg-[#3A57E8] "
            download
            rel="noreferrer"
          >
            <MdOutlineFileDownload />{" "}
            <span className="font-nunito">Download</span>
          </a>
        </td>
        <td className="py-4 px-6">
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => handleOptimizeView(_id)}
              className="w-[32px] h-[32px] flex justify-center items-center text-white rounded-full bg-[#3A57E8] "
            >
              <MdOutlineRemoveRedEye />
            </button>
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

export default OptimizationTable;
