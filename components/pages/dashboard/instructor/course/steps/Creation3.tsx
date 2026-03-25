import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { StepPropss } from "./Creation1";
import Module from "./popup/module/Module";
import { useAppSelector } from "../../../../../../redux-hook/hooks";
import ButtonLoader from "../../../../../utils/loaders/ButtonLoader";
//icon
import plusIconBg from "../../../../../../assets/Group34917.png";
import { Spinner } from "flowbite-react";

//component
import AddModuleModal from "./popup/module/AddModuleModal";
import {
  useGetCourseModuleQuery,
  useUpdateCourseMutation,
} from "../../../../../../feature/api/dashboardApi";
import EditModuleModal from "./popup/module/EditModuleModal";

const Creation3 = (props: StepPropss) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    course: { _id, title },
  } = useAppSelector((state) => state.course);
  const [moduleModalShow, setmoduleModalShow] = useState<boolean>(false);
  const { setStep, setFormData, formData, step } = props;
  const { handleSubmit } = useForm<FormData>();
  const { isError, data, error, isLoading, isSuccess } =
    useGetCourseModuleQuery(_id, { skip: !_id });
  const [updateCourse, { isLoading: isUpdating, isError: updateIsError, isSuccess: updateIsSuccess }] =
    useUpdateCourseMutation();
  const [modules, setModules] = useState<any[]>([]);
  const [EditshowModal, setEditShowModal] = useState<boolean>(false);
  const [ModuleId, setModuleId] = useState("");
  const [moduleName, setmoduleName] = useState("");
  //console.log(data);

  const submitThirdStep = async () => {
    const safeCourseId = _id;
    if (!safeCourseId) {
      toast.error("Course id is missing");
      return;
    }

    const userData: any = formData;
    await updateCourse({
      id: safeCourseId,
      isPublished: true,
      tags: userData.tags || [],
      title: userData.title,
      shortDescription: userData.shortDescription,
      category: userData.category,
      language: userData.language,
      durationInMinutes: userData.durationInMinutes,
      price: userData.price,
      level: userData.level,
      featured: userData.featured,
      numberOfLectures: userData.numberOfLectures,
      discountPrice: userData.discountPrice,
      isDiscount: userData.isDiscount,
      description: userData.description,
      courseImage: userData.courseImage,
      videoUrl: userData.videoUrl,
      messageToReviewer: userData.msgtoreviewer || "",
    });
  };

  const onPrev = () => {
    setStep(step - 1);
  };

  React.useEffect(() => {
    if (isSuccess && data?.data) {
      setModules(data.data);
    }
  }, [isSuccess, data]);

  const handleModuleDeleted = (deletedId: string) => {
    setModules((prev) =>
      prev.filter((m) => (m?._id || m?.id || "") !== deletedId),
    );
  };

  React.useEffect(() => {
    if (updateIsError) {
      toast.error("Course update failed");
    } else if (updateIsSuccess) {
      toast.success("Course updated successfully!");
      setStep(4);
    }
  }, [updateIsError, updateIsSuccess, setStep]);

  return (
    <>
      <AddModuleModal
        show={moduleModalShow}
        setShowModal={setmoduleModalShow}
      />
      {EditshowModal && (
        <EditModuleModal
          moduleName={moduleName}
          id={ModuleId}
          EditshowModal={EditshowModal}
          setEditShowModal={setEditShowModal}
        />
      )}
      <form onSubmit={handleSubmit(submitThirdStep)}>
        <div className="Curriculum p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Curriculum</h2>

          <div className="">
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
                <Spinner aria-label="Default status example" />
              </div>
            ) : (
              isSuccess &&
              modules?.map(
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
                  }: {
                    pages?: string[];
                    duration?: number;
                    id: string;
                    name?: string;
                    assignments?: string[];
                    quizzes?: string[];
                    videos?: string[];
                    slides?: string[];
                    _id: string;
                  },
                  index: number
                ) => (
                  <Module
                    pages={pages}
                    key={index}
                    setmoduleName={setmoduleName}
                    duration={duration}
                    setModuleId={setModuleId}
                    setEditShowModal={setEditShowModal}
                    _id={_id}
                    name={name}
                    index={index}
                    assignments={assignments}
                    quizzes={quizzes}
                    videos={videos}
                    slides={slides}
                    onModuleDeleted={handleModuleDeleted}
                  />
                )
              )
            )}

            <div className="btn flex justify-end gap-5">
              <button
                className="xsm:w-full lg:w-[8rem] bg-[#EBEEFD] border border-[#3A57E8] py-2 px-6 rounded-sm"
                onClick={onPrev}
              >
                Previous
              </button>
              <button
                className="xsm:w-full lg:w-[7rem] bg-[#3A57E8] py-2 px-6 text-[#fff] rounded-sm"
                type="submit"
              >
                {isUpdating ? <ButtonLoader /> : "Next"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Creation3;
