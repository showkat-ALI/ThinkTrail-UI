import React, { useState } from "react";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useForm } from "react-hook-form";
import { StepPropss } from "./Creation1";
import Module from "./popup/module/Module";

// icon
import plusIconBg from "../../../../../../assets/Group34917.png";

// component
import AddModuleModal from "./popup/module/AddModuleModal";
import EditModuleModal from "./popup/module/EditModuleModal";
import { useGetCourseModuleQuery } from "../../../../../../feature/api/dashboardApi";

const Creation3 = (props: StepPropss) => {
  const [moduleModalShow, setmoduleModalShow] = useState<boolean>(false);
  const { setStep, step } = props;
  const { handleSubmit } = useForm<FormData>();
  const params = useParams<{ editId?: string | string[] }>();
  const routeEditId = params?.editId;
  const courseId = Array.isArray(routeEditId) ? routeEditId[0] : routeEditId;

  const { data, isLoading, isSuccess } = useGetCourseModuleQuery(
    courseId ?? skipToken,
  );

  const [editshowModal, setEditShowModal] = useState<boolean>(false);
  const [moduleId, setModuleId] = useState("");
  const [moduleName, setmoduleName] = useState("");

  const submitThirdStep = () => {
    setStep(4);
  };

  const onPrev = () => {
    setStep(step - 1);
  };

  return (
    <>
      <AddModuleModal
        show={moduleModalShow}
        setShowModal={setmoduleModalShow}
      />
      {editshowModal && (
        <EditModuleModal
          moduleName={moduleName}
          id={moduleId}
          EditshowModal={editshowModal}
          setEditShowModal={setEditShowModal}
        />
      )}
      <form onSubmit={handleSubmit(submitThirdStep)}>
        <div className="Curriculum p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Curriculum</h2>

          <div>
            <div className="heading_upload_lectrue flex justify-between items-center mb-6">
              <h2 className="text-base font-medium">Upload Lecture</h2>
              <button
                onClick={() => setmoduleModalShow(!moduleModalShow)}
                type="button"
                className="bg-[#EBEEFD] border border-[#3A57E8] px-2 py-2 rounded flex items-center gap-[6px]"
              >
                <Image src={plusIconBg} alt="" />
                Add Modules
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner aria-label="loading modules" />
              </div>
            ) : (
              isSuccess &&
              data?.data?.map(
                (
                  {
                    pages = [],
                    name = "",
                    assignments = [],
                    quizzes = [],
                    videos = [],
                    slides = [],
                    duration = 0,
                    _id,
                    id,
                  }: {
                    pages?: string[];
                    duration?: number;
                    id?: string;
                    _id?: string;
                    name?: string;
                    index: string;
                    assignments?: string[];
                    quizzes?: string[];
                    videos?: string[];
                    slides?: string[];
                  },
                  index: string,
                ) => {
                  const moduleKey = _id || id || String(index);
                  return (
                    <Module
                      pages={pages}
                      key={moduleKey}
                      setmoduleName={setmoduleName}
                      duration={duration}
                      setModuleId={setModuleId}
                      setEditShowModal={setEditShowModal}
                      id={moduleKey}
                      name={name}
                      index={index}
                      assignments={assignments}
                      quizzes={quizzes}
                      videos={videos}
                      slides={slides}
                    />
                  );
                },
              )
            )}

            <div className="btn flex justify-end gap-5">
              <button
                type="button"
                className="xsm:w-full lg:w-[8rem] bg-[#EBEEFD] border border-[#3A57E8] py-2 px-6 rounded-sm"
                onClick={onPrev}
              >
                Previous
              </button>
              <button
                className="xsm:w-full lg:w-[7rem] bg-[#3A57E8] py-2 px-6 text-[#fff] rounded-sm"
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Creation3;
