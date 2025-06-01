import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Disclosure } from "@headlessui/react";
import { useAllQuizInstructorQuery } from "../../../../../feature/api/dashboardApi";
import { Spinner } from "flowbite-react";
import DeleteQuiz from "./DeleteQuiz";
import Link from "next/link";

export default function AllQuiz() {
  const { data, isSuccess, isError, isLoading } = useAllQuizInstructorQuery({});
  const [modalAssignment, setmodalAssignment] = useState(false);
  const [deleteId, setdeleteId] = useState("");
  // console.log(data)
  const handleCloseRejectAssignmentModal = () => {
    setmodalAssignment(false);
  };
  const handleEditClick = (id: any) => {
    setmodalAssignment(true);
    setdeleteId(id);
  };
  return (
    <div>
      <DeleteQuiz
        id={deleteId}
        show={modalAssignment}
        handleClose={handleCloseRejectAssignmentModal}
        title="Are you sure you want to Delete this quiz?"
        successMessage="Delete quiz Successfully!"
      />
      <h1 className="font-bold text-xl">Information</h1>
      <div className="flex justify-between xl:flex-row lg:flex-row  md:flex-row sm:flex-row xsm:flex-col items-center">
        <div className="mr-[10px] xl:w-[65%] lg:w-[55%] flex items-center md:w-[60%] sm:w-[50%] ">
          {/* <h1 className="font-bold text-xs w-[82px]">Test Name:</h1>

          <input
            type="text"
            className=""
            placeholder="Title"
            //   {...register("title", { required: true })}
            style={{
              background: " #FFFFFF",
              boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
              borderRadius: "8px",
              width: "100%",
              border: "none",
              padding: " 11px 17px",
            }}
          /> */}
          {/* {errors.title && (
              <div className="text-xs text-red-600 font-nunito">
                Enter Quiz title
              </div>
            )} */}
        </div>
        <div className="flex ">
          <div className="mr-[10px]">
            <Button>
              <Link href={`/dashboard/quiz/quiz-result`}>Quiz Result</Link>
            </Button>
          </div>
          <div>
            <Button>
              <Link href={`/dashboard/quiz/quiz-creation`}>Add Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
      <h1 className="font-bold my-[20px] text-xl">Quiz</h1>
      <div className="max-h-[100vh] overflow-y-auto flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : isSuccess && data.data.quazes.length > 0 ? (
          data.data.quazes.map((item: any, id: any) => (
            <Disclosure
              as="div"
              className="border-b-2   border-gray-300 "
              key={item._id}
            >
              {({ open }) => (
                <>
                  <div
                    className={`flex w-full px-6 py-4 justify-between items-center ${
                      !open ? "bg-transparent" : "bg-white"
                    }  text-left font-bold text-lg  hover:bg-slate-50  focus:outline-none focus:bg-white`}
                  >
                    <Disclosure.Button
                      className={"flex justify-between items-center"}
                    >
                      <span className="font-normal">{item.title}</span>
                    </Disclosure.Button>
                    <div className="flex ">
                      <div className="mr-[10px]">
                        <Disclosure.Button>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.7366 6.04606C19.4439 7.36388 20.8976 9.29455 21.9415 11.7091C22.0195 11.8924 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8924 2.05854 11.7091C4.14634 6.87903 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12Z"
                              fill="#3A57E8"
                            />
                            <path
                              d="M14.4308 11.997C14.4308 13.3255 13.3381 14.4115 12.0015 14.4115C10.6552 14.4115 9.5625 13.3255 9.5625 11.997C9.5625 11.8321 9.58201 11.678 9.61128 11.5228H9.66006C10.743 11.5228 11.621 10.6695 11.6601 9.60184C11.7674 9.58342 11.8845 9.57275 12.0015 9.57275C13.3381 9.57275 14.4308 10.6588 14.4308 11.997Z"
                              fill="#3A57E8"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>
                      <div>
                        <button onClick={() => handleEditClick(item._id)}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.4"
                              d="M19.643 9.48826C19.643 9.55626 19.11 16.297 18.8056 19.1339C18.615 20.8749 17.4927 21.9308 15.8092 21.9608C14.5157 21.9898 13.2494 21.9998 12.0036 21.9998C10.6809 21.9998 9.38741 21.9898 8.13185 21.9608C6.50477 21.9218 5.38147 20.8449 5.20057 19.1339C4.88741 16.287 4.36418 9.55626 4.35445 9.48826C4.34473 9.28327 4.41086 9.08828 4.54507 8.93028C4.67734 8.78429 4.86796 8.69629 5.06831 8.69629H18.9388C19.1382 8.69629 19.3191 8.78429 19.4621 8.93028C19.5953 9.08828 19.6624 9.28327 19.643 9.48826Z"
                              fill="#C03221"
                            />
                            <path
                              d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z"
                              fill="#C03221"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {item.questions.length > 0 ? (
                    item.questions.map((item: any) => (
                      <Disclosure.Panel
                        key={item._id}
                        className="px-5 py-5 bg-white  "
                      >
                        <p
                          className="font-bold my-4"
                          dangerouslySetInnerHTML={{
                            __html: item?.question,
                          }}
                        ></p>
                        <div
                          className="flex flex-row justify-between items-start xsm:flex-col sm:flex-row lg:flex-row md:flex-row xl:flex-row
                  
                  "
                        >
                          <div className="xsm:w-[100%] xl:w-[60%] lg:w-[60%] md:w-[60%] sm:w-[60%]">
                            <h1 className="text-[#8A92A6] font-bold">
                              Options
                            </h1>
                            <div className="grid grid-cols-2">
                              {item.answers.map((item: any) => (
                                <div key={item._id}>
                                  <div className="flex ">
                                    <p className="text-blue-600 font-bold text-3xl">
                                      &#x2022;
                                    </p>
                                    <p className="pt-2"> {item.value}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className=" m-l-[20px]">
                            <h1 className="text-[#8A92A6] font-bold">
                              Correct answers
                            </h1>
                            <div className="flex ">
                              <p className="text-blue-600 font-bold text-3xl">
                                &#x2022;
                              </p>
                              <p className="pt-2 text-[#1AA053]">
                                {" "}
                                {item.answers
                                  .filter((val: any) => val.checked === true)
                                  .map((val: any) => (
                                    <p key={val._id}>{val.value}</p>
                                  ))}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    ))
                  ) : (
                    <Disclosure.Panel className="px-5 pb-1 bg-white font-bold ">
                      No question found
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))
        ) : (
          <div>No Quiz Found</div>
        )}
      </div>
    </div>
  );
}
