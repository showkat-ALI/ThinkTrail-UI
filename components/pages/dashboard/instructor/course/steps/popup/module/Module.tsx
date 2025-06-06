import React, { useEffect, useState } from "react";
import Image from "next/image";

//icon
import editIcon from "../../../../../../../../assets/editIcon.png";
import closeIcon from "../../../../../../../../assets/closeIcon.png";
import minus from "../../../../../../../../assets/minus.png";
import plus from "../../../../../../../../assets/plus.png";
import plusIconBg from "../../../../../../../../assets/Group34917.png";
import PopupModal from ".././PopupModal";
import EditModuleModal from "./EditModuleModal";
import DeleteModule from "./deleteModule";
import {
  useGetModuleAssignmentsQuery,
  useGetModuleVideosQuery,
  useGetSingleModuleQuizesQuery,
} from "../../../../../../../../feature/api/dashboardApi";
import Link from "next/link";
const Module = ({
  setmoduleName,
  setModuleId,
  setEditShowModal,
  _id,
  name,
  index,
  assignments,
  quizzes,
  videos,
  slides,
  duration,
  pages,
}: {
  pages: string[];
  setmoduleName: Function;
  duration: number;
  setEditShowModal: Function;
  setModuleId: any;
  _id: string;
  name: string;
  index: string;
  assignments: string[];
  quizzes: string[];
  videos: string[];
  slides: string[];
}) => {
  const [ModuleTab, setModuleTab] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setshowDeleteModal] = useState<boolean>(false);
  const [seletedModule, setseletedModule] = useState("");
  const handleClose = () => {
    setshowDeleteModal(false);
    setseletedModule("");
  };

  const { error, data, isLoading, isSuccess, isError, refetch } =
    useGetModuleAssignmentsQuery(_id);
  if (isSuccess) {
    console.log(data);
  }
  const {
    error: vidsErr,
    data: vidsData,
    isLoading: vidsLoading,
    isSuccess: vidsIsSuccess,
    isError: vidsIsError,
  } = useGetModuleVideosQuery(_id);
  const {
    error: quizErr,
    data: quizDat,
    isLoading: quizIsLoading,
    isSuccess: quizIsSuccess,
    isError: quizIsError,
  } = useGetSingleModuleQuizesQuery(_id);
  useEffect(() => {
    refetch(); // Force a refetch when the component mounts or _id changes
  }, [_id, refetch]);
  const handleEdit = () => {
    setEditShowModal(true);
    setModuleId(_id);
    setmoduleName(name);
  };
  const handleDeleteModule = (id: string) => {
    //console.log("delete course");
    setshowDeleteModal(true);
    setseletedModule(id);
  };
  //console.log(assignments)
  return (
    <>
      {showModal && (
        <PopupModal
          name={name}
          index={index}
          id={_id}
          setShowModal={setShowModal}
        />
      )}

      <DeleteModule
        show={showDeleteModal}
        handleClose={handleClose}
        id={seletedModule}
      />
      <div
        className="flex justify-between items-center bg-[#F9F9F9] mb-4 p-3"
        style={{ boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)" }}
      >
        <h2 className="text-[15px] font-medium">
          Module {index + 1}: {name}-{_id}
        </h2>
        <div className="flex items-center">
          <button
            type="button"
            className="flex justify-center h-[24px] items-center"
            onClick={() => setModuleTab(!ModuleTab)}
          >
            {ModuleTab ? (
              <Image src={minus} className="w-8" width={23} alt="" />
            ) : (
              <Image src={plus} className="w-8" width={21} height={19} alt="" />
            )}
          </button>
        </div>
      </div>
      {ModuleTab && (
        <div>
          <div
            className="rounded"
            style={{ boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="flex justify-between bg-[#F9F9F9] p-3">
              <div>
                <h3 className="text-base font-medium">
                  Module {index + 1}: {name}=
                </h3>
                <span className="text-sm font-normal text-[#8A92A6]">
                  {videos.length} videos
                </span>{" "}
                <span className="text-[#8A92A6]">|</span>{" "}
                <span className="text-sm font-normal text-[#8A92A6]">
                  {duration}mins
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <div
                  className="bg-[#D5EBDF] rounded-full w-[32px] h-[32px] flex justify-center items-center cursor-pointer"
                  onClick={() => handleEdit()}
                >
                  <Image src={editIcon} width={18} height={16} alt="" />
                </div>
                <div className="bg-[#F2D6D3] rounded-full w-[32px] h-[32px] flex justify-center items-center cursor-pointer">
                  <Image
                    onClick={() => handleDeleteModule(_id)}
                    src={closeIcon}
                    width={14}
                    height={13}
                    alt="delete"
                  />
                </div>
              </div>
            </div>

            <div className="p-4">
              {data?.data?.map((item: any) => (
                <div className="mb-5" key={item._id}>
                  <div className="flex items-center mb-1">
                    <input
                      checked
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-base font-normal text-gray-900 dark:text-gray-300">
                      Assignment - {item?.assignment?.name}
                    </label>
                  </div>
                </div>
              ))}
              {/* {quizDat.map((item: any, i) => (
                <div className="mb-5" key={item._id}>
                  <div className="flex items-center mb-1">
                    <input
                      checked
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-base font-normal text-gray-900 dark:text-gray-300">
                      Quiz - {item.title}
                    </label>
                  </div>
                </div>
              ))} */}
              {vidsData?.data?.length > 0 ? (
                vidsData?.data?.map((item: any) => (
                  <div className="mb-5" key={item._id}>
                    <div className="flex items-center mb-1">
                      <input
                        checked
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <Link
                        className="ml-2 text-base font-normal text-gray-900 dark:text-gray-300"
                        href={`${item?.localVideo}`}
                      >
                        video - {item?.localVideo}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No videos found.</p>
              )}
              {/* {slides.map((item: any, i) => (
                <div className="mb-5" key={item._id}>
                  <div className="flex items-center mb-1">
                    <input
                      checked
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-base font-normal text-gray-900 dark:text-gray-300">
                      File - {item.title}
                    </label>
                  </div>
                </div>
              ))}
              {pages.map((item: any, i) => (
                <div className="mb-5" key={item._id}>
                  <div className="flex items-center mb-1">
                    <input
                      checked
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="ml-2 text-base font-normal text-gray-900 dark:text-gray-300">
                      Pages - {item.title}
                    </label>
                  </div>
                </div>
              ))}  */}
            </div>
          </div>

          <div className="mt-5 mb-6">
            <button
              type="button"
              className="xsm:w-full lg:w-[9rem] justify-center bg-[#EBEEFD] border border-[#3A57E8] px-3 py-2 rounded flex items-center gap-[6px]"
              onClick={() => setShowModal(true)}
            >
              <Image src={plusIconBg} alt="" />
              Add Content
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Module;
