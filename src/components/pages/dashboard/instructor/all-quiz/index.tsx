import React, { Fragment, useEffect } from "react";
import rocket from "../../../../../assets/dashboard/Mask group.png";
import Image from "next/image";
import {
  useAllQuizInstructorQuery,
  useDeleteQuizMutation,
} from "../../../../../feature/api/dashboardApi";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineDelete, AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { useGetUserQuery } from "../../../../../feature/api/authApi";

export default function AllQuizes() {
  const {
    data: userData,
    isSuccess: userIsSuccess,
    isError: isErrorUser,
  } = useGetUserQuery({});

  console.log("me data", userData);

  const { data, isSuccess, isError, isLoading } = useAllQuizInstructorQuery(
    userData?.data?._id
  );
  console.log("all", data, "insID", userData.data._id);
  const [
    DeleteQuiz,
    {
      isLoading: DeleteQuizLoading,
      error: quizdeleteError,
      data: quizdata,
      isSuccess: quizSuccess,
      isError: quizError,
    },
  ] = useDeleteQuizMutation();

  console.log(data);
  const DeleteQuizs = (id: any) => {
    DeleteQuiz(id);
  };

  useEffect(() => {
    if (quizError) {
      toast.error("Quiz has Deleted error");
    } else if (quizSuccess) {
      toast.success("Quiz has Deleted Successfully!");
    }
  }, [quizError, quizSuccess]);
  return (
    <div className="xsm:p-1 sm:p-1 lg:p-4 md:p-3 xl:p-5 font-nunito">
      <div className="flex justify-between items-center mb-[20px] xsm:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row">
        <div>
          <h1 className="font-bold text-lg">Quizes</h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="p-[5px] border-[1px] rounded-l-full rounded-r-full border-gray-300  flex justify-between items-center">
            <div className="border-r-[3px] border-gray-300 mx-[3px]">
              <h1 className="mr-[3px]"> 40% of total </h1>
            </div>
            <div className="flex justify-between items-center">
              <h1>1 Rule</h1>
              <span>
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9781 0.722605C11.2417 0.986209 11.2417 1.4136 10.9781 1.6772L6.00078 6.6545L1.02348 1.6772C0.75988 1.4136 0.75988 0.986209 1.02348 0.722605C1.28709 0.459001 1.71447 0.459001 1.97808 0.722605L6.00078 4.74531L10.0235 0.722605C10.2871 0.459001 10.7145 0.459001 10.9781 0.722605Z"
                    fill="#3F434A"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="xsm:mx-[5px] sm:mx-[5px] md:mx-[10] lg:mx-[30px] xl:mx-[30px] cursor-pointer">
            <Link
              href={"/dashboard/quiz/quiz-creation"}
              as={`/dashboard/quiz/quiz-creation`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33 16.5C33 20.8761 31.2616 25.0729 28.1673 28.1673C25.0729 31.2616 20.8761 33 16.5 33C12.1239 33 7.92709 31.2616 4.83274 28.1673C1.73839 25.0729 0 20.8761 0 16.5C0 12.1239 1.73839 7.92709 4.83274 4.83274C7.92709 1.73839 12.1239 0 16.5 0C20.8761 0 25.0729 1.73839 28.1673 4.83274C31.2616 7.92709 33 12.1239 33 16.5ZM17.5312 9.28125C17.5312 9.00775 17.4226 8.74544 17.2292 8.55205C17.0358 8.35865 16.7735 8.25 16.5 8.25C16.2265 8.25 15.9642 8.35865 15.7708 8.55205C15.5774 8.74544 15.4688 9.00775 15.4688 9.28125V15.4688H9.28125C9.00775 15.4688 8.74544 15.5774 8.55205 15.7708C8.35865 15.9642 8.25 16.2265 8.25 16.5C8.25 16.7735 8.35865 17.0358 8.55205 17.2292C8.74544 17.4226 9.00775 17.5312 9.28125 17.5312H15.4688V23.7188C15.4688 23.9923 15.5774 24.2546 15.7708 24.448C15.9642 24.6414 16.2265 24.75 16.5 24.75C16.7735 24.75 17.0358 24.6414 17.2292 24.448C17.4226 24.2546 17.5312 23.9923 17.5312 23.7188V17.5312H23.7188C23.9923 17.5312 24.2546 17.4226 24.448 17.2292C24.6414 17.0358 24.75 16.7735 24.75 16.5C24.75 16.2265 24.6414 15.9642 24.448 15.7708C24.2546 15.5774 23.9923 15.4688 23.7188 15.4688H17.5312V9.28125Z"
                  fill="#3A57E8"
                />
              </svg>
            </Link>
          </div>
          <div>
            <span>
              <svg
                width="8"
                height="20"
                viewBox="0 0 8 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.61539 29.1923C7.61539 30.2022 7.21422 31.1707 6.50014 31.8848C5.78606 32.5988 4.81756 33 3.80769 33C2.79783 33 1.82933 32.5988 1.11525 31.8848C0.401166 31.1707 0 30.2022 0 29.1923C0 28.1824 0.401166 27.2139 1.11525 26.4999C1.82933 25.7858 2.79783 25.3846 3.80769 25.3846C4.81756 25.3846 5.78606 25.7858 6.50014 26.4999C7.21422 27.2139 7.61539 28.1824 7.61539 29.1923ZM7.61539 16.5C7.61539 17.5099 7.21422 18.4784 6.50014 19.1924C5.78606 19.9065 4.81756 20.3077 3.80769 20.3077C2.79783 20.3077 1.82933 19.9065 1.11525 19.1924C0.401166 18.4784 0 17.5099 0 16.5C0 15.4901 0.401166 14.5216 1.11525 13.8076C1.82933 13.0935 2.79783 12.6923 3.80769 12.6923C4.81756 12.6923 5.78606 13.0935 6.50014 13.8076C7.21422 14.5216 7.61539 15.4901 7.61539 16.5ZM7.61539 3.80769C7.61539 4.81755 7.21422 5.78606 6.50014 6.50014C5.78606 7.21422 4.81756 7.61538 3.80769 7.61538C2.79783 7.61538 1.82933 7.21422 1.11525 6.50014C0.401166 5.78606 0 4.81755 0 3.80769C0 2.79783 0.401166 1.82933 1.11525 1.11525C1.82933 0.401167 2.79783 0 3.80769 0C4.81756 0 5.78606 0.401167 6.50014 1.11525C7.21422 1.82933 7.61539 2.79783 7.61539 3.80769Z"
                  fill="#707070"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        isSuccess && (
          <div className="w-full flex flex-col max-w-[100vw] max-h-[100vh] overflow-y-scroll">
            <div className="">
              {data.data.groupedQuestions.map((group: any) => (
                <div key={group.title} className="mb-4">
                  <h2 className="font-bold text-xl mb-2">{group.title}</h2>
                  {group.questions.map((question: any) => (
                    <div
                      key={question._id}
                      className="p-3 bg-white border-b border-gray-200 mb-2"
                    >
                      <div
                        className="font-semibold text-lg"
                        dangerouslySetInnerHTML={{ __html: question.question }}
                      />
                      <ul className="list-disc pl-5">
                        {question.answers.map((answer: any) => (
                          <li key={answer._id} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={answer.checked}
                              readOnly
                              className="mr-2"
                            />
                            <span>{answer.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
