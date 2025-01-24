import React, { useState, useEffect } from "react";
import InstructorCss from "../../../../../styles/Instructor.module.css";
import Head from "next/head";
import Image from "next/image";
import Pdf from "../../../../../assets/Pdf.png";
import DocumentLogo from "../../../../../assets/Document.png";
import MoreIcon from "../../../../../assets/MoreIcon.png";
import FileBgImage from "../../../../../assets/FileBgImage.png";
import ImageIcon from "../../../../../assets/ImageIcon.png";
import PlayIcon from "../../../../../assets/Play.png";
import VideoIcon from "../../../../../assets/Video.png";
import PlusIcon from "../../../../../assets/PlusIcon.png";
import {
  useAllAssignmentInstructorQuery,
  useDeleteByFileMutation,
  useGetMyEnrollmentAllQuery,
  useAllfilesQuery,
  useGetAllInstructorCourseQuery,
  useGetInstructorFileQuery,
  useCreateFileMutation,
} from "../../../../../feature/api/dashboardApi";
import { useSingleFileUploadMutation } from "../../../../../feature/api/mediaUploadApi";
// import PlusIcon from "../../../../../assets/plusIcon.png";
import { useAppSelector } from "../../../../../app/hooks";
import moment from "moment";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import imgJPG from "../../../../../assets/01.jpg";

const File = () => {
  const {
    data: enrollData,
    isSuccess: enrollSuccess,
    isError: enrollError,
    isLoading: enrollLoading,
  } = useGetMyEnrollmentAllQuery({});
  const { id, roles } = useAppSelector((state) => state.auth.user);
  const {
    data: assignmentData,
    isSuccess: assignmentSuccess,
    isError: assignmentIsError,
    isLoading: assignmentLoading,
  } = useAllAssignmentInstructorQuery(id);
  const {
    data: allfileData,
    isSuccess: allfileSuccess,
    isError: allfileIsError,
    isLoading: allFileLoading,
  } = useAllfilesQuery({});
  const {
    data: courseData,
    isSuccess: courseSuccess,
    isError: courseIsError,
    isLoading: courseLoading,
  } = useGetAllInstructorCourseQuery({});
  const {
    data: instructorFileData,
    isSuccess: instructorFileSuccess,
    isError: instructorFileError,
    isLoading: instructorFileLoading,
  } = useGetInstructorFileQuery(id);
  const [
    singleFileupload,
    {
      isLoading: uploadLoading,
      error: uploadError,
      data: uploadData,
      isSuccess: isUploadSuccess,
      isError: isUploadError,
    },
  ] = useSingleFileUploadMutation();
  const [
    createFile,
    {
      isLoading: createFileLoading,
      error: createFileError,
      data: createFileData,
      isSuccess: createFileSuccess,
      isError: createFileIsError,
    },
  ] = useCreateFileMutation();
  const [
    deleteByFile,
    {
      isLoading: deleteFileLoading,
      error: deleteFileError,
      data: deleteFileData,
      isSuccess: deleteFileSuccess,
      isError: deleteFileIsError,
    },
  ] = useDeleteByFileMutation();
  const [open, setopen] = useState(false);
  const [playVideo, setplayVideo] = useState("");
  const [activeMenu, setactiveMenu] = useState("");
  //const [dbfile, setdbfile] = useState("")
  //const [dbfileKey, setdbfileKey] = useState("")

  const videoHandle = (url: any) => {
    setplayVideo(url);
    setopen(true);
  };

  const FileGet = (e: any) => {
    const file = e.target.files;
    if (file && file.length > 0 && file["0"]) {
      const formData = new FormData();
      formData.append("file", file["0"]);
      singleFileupload(formData);
    } else if (
      file &&
      file.length > 0 &&
      file["0"].type.substr(0, 5) !== "file"
    ) {
      toast.error("Select a valid file.");
    }
  };

  useEffect(() => {
    if (isUploadError) {
      console.log("upload error", uploadError);
      toast.error((uploadError as any).data.message);
    } else if (isUploadSuccess) {
      console.log("upload success", uploadData);
      // toast.success("upload file success")
      createFile({
        file: uploadData.data.fileUrl,
        key: uploadData.data.key,
      });
    }
  }, [isUploadError, isUploadSuccess]);

  useEffect(() => {
    if (createFileIsError) {
      toast.error("file upload failed");
    } else if (createFileSuccess) {
      toast.success("upload file success");
    }
  }, [createFileIsError, createFileSuccess]);

  //console.log(allfileData)
  const activemenuHandle = (id: any) => {
    setactiveMenu(id);
  };

  const deleteFileHandle = (id: any) => {
    console.log("d");
    deleteByFile({
      id: id,
    });
  };

  useEffect(() => {
    if (deleteFileIsError) {
      toast.error((deleteFileIsError as any).data.message);
    } else if (deleteFileSuccess) {
      toast.success("File Delete Successfully");
    }
  }, [deleteFileIsError, deleteFileSuccess]);

  return (
    <>
      <div className={InstructorCss.AllFiles}>
        <div className="flex xsm:flex-col items-baseline md:flex-row justify-between border-b-2 pb-7 ">
          <div className={`${InstructorCss.AllFileContent} md:w-[70%]`}>
            <h3>All Files</h3>
          </div>
          {roles.includes("instructor") && (
            <div className="flex md:justify-end md:flex-row md:w-full xsm:justify-center xsm:flex-col xsm:w-full xsm:gap-5 xsm:mt-3">
              {/*
                    <button className='flex items-center rounded justify-center gap-1' style={{color:"#fff",background:"#3A57E8",padding:"8px 11px"}}>Create Folder <Image src={PlusIcon} alt=""/></button>
                  */}
              <label
                className="cursor-pointer flex items-center rounded  justify-center gap-1"
                style={{
                  color: "#fff",
                  background: "#3A57E8",
                  padding: "8px 11px",
                }}
              >
                {uploadLoading || createFileLoading ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  <>
                    Upload Files <Image src={PlusIcon} alt="" />
                    <input
                      type="file"
                      onChange={FileGet}
                      className="hidden"
                      disabled={uploadLoading || createFileLoading}
                    />
                  </>
                )}
              </label>
              {/*
                    <button className='flex items-center rounded  justify-center gap-1' style={{color:"#fff",background:"#3A57E8",padding:"8px 11px"}}>All Files <Image src={PlusIcon} alt=""/></button>
                    */}
            </div>
          )}
        </div>
        {roles.includes("student") &&
          (enrollLoading && allFileLoading ? (
            <div className="flex justify-center items-center mt-2">
              <Spinner />
            </div>
          ) : (
            enrollSuccess &&
            allfileSuccess && (
              <div>
                <div className={`${InstructorCss.FileDocuments} mt-5`}>
                  <h2>Documents</h2>
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {enrollSuccess &&
                      enrollData.data.enrollments?.map((val1: any) => {
                        return val1?.course?.modules?.map((val2: any) => {
                          return val2?.assignments?.map((val3: any) => {
                            return (
                              <>
                                {(val3.key.split(".").pop() === "docs" ||
                                  val3.key.split(".").pop() === "pdf" ||
                                  val3.key.split(".").pop() === "zip") && (
                                  <div
                                    key={val3._id}
                                    className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                                    style={{
                                      background: "#FFFFFF",
                                      boxShadow:
                                        "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                    }}
                                  >
                                    <div className="container">
                                      <a
                                        target="_blank"
                                        href={`https://docs.google.com/gview?url=${val3.fileUrl}`}
                                      >
                                        <div
                                          className="text-center"
                                          style={{
                                            background: "#F9F9F9",
                                            borderRadius: "5px",
                                            padding: "35px 0px",
                                          }}
                                        >
                                          <Image
                                            src={Pdf}
                                            className={
                                              InstructorCss.documentCardImg
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </a>

                                      <div
                                        className={
                                          InstructorCss.documentCardFooterContent
                                        }
                                      >
                                        <div
                                          className="flex justify-between"
                                          style={{ margin: "10px 0px" }}
                                        >
                                          <span>
                                            Created on{" "}
                                            {moment(val3.createdAt)
                                              .utc()
                                              .format("DD MMMM YYYY")}
                                          </span>
                                          <span
                                            className={InstructorCss.dff35mb}
                                          >
                                            5 mb
                                          </span>
                                        </div>
                                        <div
                                          className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                          style={{ gap: "9px" }}
                                        >
                                          <Image src={DocumentLogo} alt="" />
                                          <h3>{val3?.key.split("")}</h3>
                                        </div>
                                        {/* 
                                                     <div className={InstructorCss.documentCardFooterContentbottom}>
                                                         <h3>You opened<span className={InstructorCss.juose}> just Now</span></h3>
                                                     </div>
                                                     */}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {val2?.slides?.map(
                                  (slideVal: any) =>
                                    slideVal.fileUrl.split(".").pop() ===
                                      "pdf" && (
                                      <div
                                        key={slideVal._id}
                                        className="overflow-hidden rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                                        style={{
                                          background: "#FFFFFF",
                                          boxShadow:
                                            "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                        }}
                                      >
                                        <div className="container">
                                          <a
                                            target="_blank"
                                            href={`https://docs.google.com/gview?url=${slideVal.fileUrl}`}
                                          >
                                            <div
                                              className="text-center"
                                              style={{
                                                background: "#F9F9F9",
                                                borderRadius: "5px",
                                                padding: "35px 0px",
                                              }}
                                            >
                                              <Image
                                                src={Pdf}
                                                className={
                                                  InstructorCss.documentCardImg
                                                }
                                                alt=""
                                              />
                                            </div>
                                          </a>

                                          <div
                                            className={
                                              InstructorCss.documentCardFooterContent
                                            }
                                          >
                                            <div
                                              className="flex justify-between"
                                              style={{ margin: "10px 0px" }}
                                            >
                                              <span>
                                                Created on{" "}
                                                {moment(slideVal.createdAt)
                                                  .utc()
                                                  .format("DD MMMM YYYY")}
                                              </span>
                                              <span
                                                className={
                                                  InstructorCss.dff35mb
                                                }
                                              >
                                                5 mb
                                              </span>
                                            </div>
                                            <div
                                              className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                              style={{ gap: "9px" }}
                                            >
                                              <Image
                                                src={DocumentLogo}
                                                alt=""
                                              />
                                              <h3>
                                                {slideVal?.fileUrl
                                                  .split("/")
                                                  .pop()}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                )}
                              </>
                            );
                          });
                        });
                      })}
                    {allfileSuccess &&
                      allfileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "pdf" ||
                            val.key.split(".").pop() === "docs" ||
                            val.key.split(".").pop() === "zip" ||
                            val.key.split(".").pop() === "txt") && (
                            <div
                              key={val._id}
                              className="overflow-hidden rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                              }}
                            >
                              <div className="container">
                                <a
                                  target="_blank"
                                  href={`https://docs.google.com/gview?url=${val.file}`}
                                >
                                  <div
                                    className="text-center"
                                    style={{
                                      background: "#F9F9F9",
                                      borderRadius: "5px",
                                      padding: "35px 0px",
                                    }}
                                  >
                                    <Image
                                      src={Pdf}
                                      className={InstructorCss.documentCardImg}
                                      alt=""
                                    />
                                  </div>
                                </a>

                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                    <span className={InstructorCss.dff35mb}>
                                      5 mb
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                    style={{ gap: "9px" }}
                                  >
                                    <Image src={DocumentLogo} alt="" />
                                    <h3>{val.key}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>
                <div className={`${InstructorCss.FileDocuments} mt-8`}>
                  <h2>Images</h2>
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {enrollSuccess &&
                      enrollData.data.enrollments?.map((val1: any) => {
                        return val1?.course?.modules?.map((val2: any) => {
                          return val2?.assignments?.map((val3: any) => {
                            return (
                              <>
                                {(val3.key.split(".").pop() === "jpg" ||
                                  val3.key.split(".").pop() === "png" ||
                                  val3.key.split(".").pop() === "jpeg") && (
                                  <div
                                    key={val3._id}
                                    className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                                    style={{
                                      background: "#FFFFFF",
                                      boxShadow:
                                        "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                    }}
                                  >
                                    <div className="container">
                                      <a target="_blank" href={val3.fileUrl}>
                                        <div
                                          className={
                                            InstructorCss.documentCardImgImg
                                          }
                                          style={{
                                            backgroundImage: `url(${val3.fileUrl})`,
                                          }}
                                        >
                                          {/*
                                                      <Image src={MoreIcon} alt=""/>
                                                   */}
                                        </div>
                                      </a>
                                      <div
                                        className={
                                          InstructorCss.documentCardFooterContent
                                        }
                                      >
                                        <div
                                          className="flex justify-between"
                                          style={{ margin: "10px 0px" }}
                                        >
                                          <span>
                                            Created on{" "}
                                            {moment(val3.createdAt)
                                              .utc()
                                              .format("DD MMMM YYYY")}
                                          </span>
                                        </div>
                                        <div
                                          className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                          style={{ gap: "9px" }}
                                        >
                                          <Image src={ImageIcon} alt="" />
                                          <h3>Doc -{val3.key}</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          });
                        });
                      })}
                    {allfileSuccess &&
                      allfileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "jpg" ||
                            val.key.split(".").pop() === "png" ||
                            val.key.split(".").pop() === "jpeg") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                              }}
                            >
                              <div className="container">
                                <a target="_blank" href={val.file}>
                                  <div
                                    className={InstructorCss.documentCardImgImg}
                                    style={{
                                      backgroundImage: `url(${val.file})`,
                                    }}
                                  >
                                    {/*
                                    <Image src={MoreIcon} alt=""/>
                                 */}
                                  </div>
                                </a>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                    style={{ gap: "9px" }}
                                  >
                                    <Image src={ImageIcon} alt="" />
                                    <h3>Doc -{val.key}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>

                <div className={`${InstructorCss.FileDocuments} mt-8`}>
                  <h2>Videos</h2>
                  <ModalVideo
                    channel="custom"
                    isOpen={open}
                    url={playVideo}
                    onClose={() => setopen(false)}
                  />
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {enrollSuccess &&
                      enrollData?.data?.enrollments?.map((val1: any) => {
                        return val1?.course?.modules?.map((val2: any) => {
                          return val2?.videos?.map((val3: any) => {
                            return (
                              <>
                                {(val3.youtubeVideo) && (
                                  <div
                                    key={val3._id}
                                    className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                                    style={{
                                      background: "#FFFFFF",
                                      boxShadow:
                                        "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                    }}
                                  >
                                    <div className="container">
                                      <div
                                        className={
                                          InstructorCss.documentCardImgImgVideo
                                        }
                                        style={{
                                          backgroundImage: `url(${imgJPG.src})`,
                                        }}
                                      >
                                        <Image
                                          src={PlayIcon}
                                          alt=""
                                          className="cursor-pointer"
                                          onClick={() =>
                                            videoHandle(val3.youtubeVideo)
                                          }
                                        />
                                      </div>
                                      <div
                                        className={
                                          InstructorCss.documentCardFooterContent
                                        }
                                      >
                                        <div
                                          className="flex justify-between"
                                          style={{ margin: "10px 0px" }}
                                        >
                                          <span>
                                            Created on{" "}
                                            {moment(val3.createdAt)
                                              .utc()
                                              .format("DD MMMM YYYY")}
                                          </span>
                                        </div>
                                        <div
                                          className={`${InstructorCss.documentCardFooterContentMiddleVideo} d-flex`}
                                        >
                                          <Image
                                            src={VideoIcon}
                                            style={{
                                              width: "27px",
                                              height: "22px",
                                            }}
                                            alt=""
                                          />
                                          <h3>Video -{val3?.topicName}</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          });
                        });
                      })}

                    {/*allfileSuccess &&
                      allfileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "mkv" ||
                            val.key.split(".").pop() === "mp4") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                              }}
                            >
                              <div className="container">
                                <div
                                  className={
                                    InstructorCss.documentCardImgImgVideo
                                  }
                                  style={{
                                    backgroundImage: `url(${imgJPG.src})`,
                                  }}
                                >
                                  <Image
                                    src={PlayIcon}
                                    alt=""
                                    className="cursor-pointer"
                                    onClick={() => videoHandle(val.file)}
                                  />
                                </div>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                  </div>
                                  <div
                                    className={`${InstructorCss.documentCardFooterContentMiddleVideo} d-flex`}
                                  >
                                    <Image
                                      src={VideoIcon}
                                      style={{ width: "27px", height: "22px" }}
                                      alt=""
                                    />
                                    <h3>Video -{val?.key}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                                      )*/}
                  </div>
                </div>
              </div>
            )
          ))}
        {roles.includes("instructor") &&
          (assignmentLoading && courseLoading && instructorFileLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            assignmentSuccess &&
            instructorFileSuccess &&
            courseSuccess && (
              <>
                <div className={`${InstructorCss.FileDocuments} mt-5`}>
                  <h2>Documents</h2>
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {assignmentSuccess &&
                      assignmentData.data.assignments.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "pdf" ||
                            val.key.split(".").pop() === "docs" ||
                            val.key.split(".").pop() === "zip" ||
                            val.key.split(".").pop() === "rar") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                height: "385px",
                              }}
                            >
                              <div className="container">
                                <a
                                  target="_blank"
                                  href={`https://docs.google.com/gview?url=${val.fileUrl}`}
                                >
                                  <div
                                    className="text-center"
                                    style={{
                                      background: "#F9F9F9",
                                      borderRadius: "5px",
                                      padding: "35px 0px",
                                    }}
                                  >
                                    <Image
                                      src={Pdf}
                                      className={InstructorCss.documentCardImg}
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    className={
                                      InstructorCss.documentCardFooterContent
                                    }
                                  >
                                    <div
                                      className="flex justify-between"
                                      style={{ margin: "10px 0px" }}
                                    >
                                      <span>
                                        Created on{" "}
                                        {moment(val.createdAt)
                                          .utc()
                                          .format("DD MMMM YYYY")}
                                      </span>
                                      <span className={InstructorCss.dff35mb}>
                                        5 mb
                                      </span>
                                    </div>
                                    <div
                                      className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                      style={{ gap: "9px" }}
                                    >
                                      <Image src={DocumentLogo} alt="" />
                                      <h3>Doc -{val.key}</h3>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          )
                      )}
                    {instructorFileSuccess &&
                      instructorFileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "pdf" ||
                            val.key.split(".").pop() === "docs" ||
                            val.key.split(".").pop() === "zip" ||
                            val.key.split(".").pop() === "rar") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card  xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                height: "385px",
                              }}
                            >
                              <div className="container">
                                <div
                                  className={`text-center relative w-full h-[218px] bg-no-repeat`}
                                  style={{
                                    background: "rgb(249, 249, 249)",
                                    borderRadius: "5px",
                                    padding: "35px 0px",
                                    backgroundSize: "100% 100%",
                                  }}
                                >
                                  <Image
                                    src={Pdf}
                                    className={InstructorCss.documentCardImg}
                                    alt=""
                                  />
                                  <div className="test absolute right-0 top-0 block">
                                    <Image
                                      src={MoreIcon}
                                      alt=""
                                      className="cursor-pointer"
                                      onClick={() => activemenuHandle(val._id)}
                                    />
                                  </div>
                                  <div
                                    className={`absolute shadow-2xl top-3 bg-white right-2 rounded px-1 ${
                                      activeMenu === val._id
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <button
                                      disabled={deleteFileLoading}
                                      onClick={() => deleteFileHandle(val._id)}
                                      className="py-2 px-3 flex justify-center items-center gap-1"
                                    >
                                      <RiDeleteBin6Line className="bg-[#bb1c1c] text-white w-[25px] h-[25px] rounded-full p-1" />
                                      <span>
                                        {deleteFileLoading ? (
                                          <Spinner />
                                        ) : (
                                          "Delete"
                                        )}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                  onClick={() => setactiveMenu("")}
                                >
                                  <a
                                    target="_blank"
                                    href={`https://docs.google.com/gview?url=${val.file}`}
                                  >
                                    <div
                                      className="flex justify-between"
                                      style={{ margin: "10px 0px" }}
                                    >
                                      <span>
                                        Created on{" "}
                                        {moment(val.createdAt)
                                          .utc()
                                          .format("DD MMMM YYYY")}
                                      </span>
                                      <span className={InstructorCss.dff35mb}>
                                        5 mb
                                      </span>
                                    </div>
                                    <div
                                      className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                      style={{ gap: "9px" }}
                                    >
                                      <Image src={DocumentLogo} alt="" />
                                      <h3>Doc -{val.key}</h3>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>

                <div className={`${InstructorCss.FileDocuments} mt-8`}>
                  <h2>Images</h2>
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {assignmentSuccess &&
                      assignmentData.data.assignments.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "jpg" ||
                            val.key.split(".").pop() === "png" ||
                            val.key.split(".").pop() === "jpeg") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                height: "385px",
                              }}
                            >
                              <div className="container">
                                <a target="_blank" href={val.fileUrl}>
                                  <div
                                    className={InstructorCss.documentCardImgImg}
                                    style={{
                                      backgroundImage: `url(${val?.fileUrl})`,
                                    }}
                                  >
                                    <Image src={MoreIcon} alt="" />
                                  </div>
                                </a>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                  </div>
                                  <div
                                    className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                    style={{ gap: "9px" }}
                                  >
                                    <Image src={ImageIcon} alt="" />
                                    <h3>Doc -{val.key}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    {instructorFileSuccess &&
                      instructorFileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "jpg" ||
                            val.key.split(".").pop() === "png" ||
                            val.key.split(".").pop() === "jpeg") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                height: "385px",
                              }}
                            >
                              <div className="container">
                                <div
                                  className={`${InstructorCss.documentCardImgImg} relative`}
                                  style={{
                                    backgroundImage: `url(${val?.file})`,
                                  }}
                                >
                                  <Image
                                    src={MoreIcon}
                                    alt=""
                                    className="cursor-pointer"
                                    onClick={() => activemenuHandle(val._id)}
                                  />
                                  <div
                                    className={`absolute shadow-2xl top-3 bg-white right-2 rounded px-1 ${
                                      activeMenu === val._id
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <button
                                      disabled={deleteFileLoading}
                                      onClick={() => deleteFileHandle(val._id)}
                                      className="py-2 px-3 flex justify-center items-center gap-1"
                                    >
                                      <RiDeleteBin6Line className="bg-[#bb1c1c] text-white w-[25px] h-[25px] rounded-full p-1" />
                                      <span>
                                        {deleteFileLoading ? (
                                          <Spinner />
                                        ) : (
                                          "Delete"
                                        )}
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                  onClick={() => setactiveMenu("")}
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                  </div>
                                  <a target="_blank" href={val.file}>
                                    <div
                                      className={`flex items-center ${InstructorCss.documentCardFooterContentMiddle}`}
                                      style={{ gap: "9px" }}
                                    >
                                      <Image src={ImageIcon} alt="" />
                                      <h3>Doc -{val.key}</h3>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>

                <div className={`${InstructorCss.FileDocuments} mt-8`}>
                  <h2>Videos</h2>
                  <ModalVideo
                    channel="custom"
                    isOpen={open}
                    url={playVideo}
                    onClose={() => setopen(false)}
                  />
                  <div className="lg:grid md:grid xsm:flex md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xsm:flex-col  document_row gap-6">
                    {courseSuccess &&
                      courseData.data.courses.map((val: any) =>
                        val.modules.map((val2: any) =>
                          val2.videos.map((val3: any) => (
                            <>
                              {(val3.key.split(".").pop() !== "mkv" ||
                                val3.key.split(".").pop() !== "mp4") && (
                                <div
                                  key={val3._id}
                                  className="rounded-lg p-4 document_card xsm:!w-full md:!w-full"
                                  style={{
                                    background: "#FFFFFF",
                                    boxShadow:
                                      "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                    height: "385px",
                                  }}
                                >
                                  <div className="container">
                                    <div
                                      className={`${InstructorCss.documentCardImgImgVideo}`}
                                      style={{
                                        backgroundImage: `url(${imgJPG.src})`,
                                      }}
                                    >
                                      <Image
                                        src={PlayIcon}
                                        alt=""
                                        className="cursor-pointer"
                                        onClick={() =>
                                          videoHandle(val3.youtubeVideo)
                                        }
                                      />
                                    </div>
                                    <div
                                      className={
                                        InstructorCss.documentCardFooterContent
                                      }
                                    >
                                      <div
                                        className="flex justify-between"
                                        style={{ margin: "10px 0px" }}
                                      >
                                        <span>
                                          Created on{" "}
                                          {moment(val3.createdAt)
                                            .utc()
                                            .format("DD MMMM YYYY")}
                                        </span>
                                      </div>
                                      <div
                                        className={`${InstructorCss.documentCardFooterContentMiddleVideo} d-flex`}
                                      >
                                        <Image
                                          src={VideoIcon}
                                          style={{
                                            width: "27px",
                                            height: "22px",
                                          }}
                                          alt=""
                                        />
                                        <h3>Video -{val3.topicName}</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ))
                        )
                      )}
                    {instructorFileSuccess &&
                      instructorFileData.data.files.map(
                        (val: any) =>
                          (val.key.split(".").pop() === "mp4" ||
                            val.key.split(".").pop() === "mkv") && (
                            <div
                              key={val._id}
                              className="rounded-lg p-4 document_card xsm:!w-full md:!w-full"
                              style={{
                                background: "#FFFFFF",
                                boxShadow: "0px 8px 32px rgba(0, 16, 41, 0.05)",
                                height: "385px",
                              }}
                            >
                              <div className="container">
                                <div
                                  className={`${InstructorCss.documentCardImgImgVideo}`}
                                  style={{
                                    backgroundImage: `url(${imgJPG.src})`,
                                  }}
                                >
                                  <Image
                                    src={PlayIcon}
                                    alt=""
                                    className="cursor-pointer"
                                    onClick={() => videoHandle(val.file)}
                                  />
                                </div>
                                <div
                                  className={
                                    InstructorCss.documentCardFooterContent
                                  }
                                >
                                  <div
                                    className="flex justify-between"
                                    style={{ margin: "10px 0px" }}
                                  >
                                    <span>
                                      Created on{" "}
                                      {moment(val.createdAt)
                                        .utc()
                                        .format("DD MMMM YYYY")}
                                    </span>
                                  </div>
                                  <div
                                    className={`${InstructorCss.documentCardFooterContentMiddleVideo} d-flex`}
                                  >
                                    <Image
                                      src={VideoIcon}
                                      style={{ width: "27px", height: "22px" }}
                                      alt=""
                                    />
                                    <h3>Video -{val.key}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                </div>
              </>
            )
          ))}
      </div>
    </>
  );
};

export default File;
