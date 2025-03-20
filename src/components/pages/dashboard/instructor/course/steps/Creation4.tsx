import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { InputErrorMessage } from "../../../../../utils/error";
import { StepPropss } from "./Creation1";
import {
  useUpdateCourseMutation,
  useGetFaqsQuery,
} from "../../../../../../feature/api/dashboardApi";
import { TagsInput } from "react-tag-input-component";
import { useAppSelector } from "../../../../../../app/hooks";
import ButtonLoader from "../../../../../utils/loaders/ButtonLoader";
import { useAppDispatch } from "../../../../../../app/hooks";
import { SuccessCreate } from "../../../../../../feature/course/courseSlice";
//icon
import editIcon from "../../../../../../assets/editIcon.png";
import closeIcon from "../../../../../../assets/closeIcon.png";
import minus from "../../../../../../assets/minus.png";
import plus from "../../../../../../assets/plus.png";
import plusIconBg from "../../../../../../assets/Group34917.png";

import FaqsCreateModal from "./popup/FaqsCreateModal";
import Link from "next/link";

type props = {
  tags: string[];
  msgtoreviewer: string;
  anymsg: boolean;
};

const Creation4 = (props: StepPropss) => {
  const {
    course: { id, title },
  } = useAppSelector((state) => state.course);
  const [moduleModalShow, setmoduleModalShow] = useState<boolean>(false);
  const { setStep, setFormData, formData, step } = props;
  const dispatch = useAppDispatch();
  const [updateCourse, { isError, data, error, isLoading, isSuccess }] =
    useUpdateCourseMutation();
  const {
    data: faqsData,
    isError: faqsisError,
    error: faqsError,
    isLoading: faqsLoading,
    isSuccess: faqsIsSuccess,
  } = useGetFaqsQuery(id);
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<props>({
    defaultValues: {
      tags: formData.tags,
      msgtoreviewer: formData.msgtoreviewer,
    },
  });

  const courseRegister = async (data: props) => {
    setFormData((prev: object) => ({ ...prev, ...data }));
    const userData = { ...formData, ...data };

    // console.log("userData", userData);

    await updateCourse({
      id,
      isPublished: true,
      tags: userData.tags,
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
      messageToReviewer: userData.msgtoreviewer,
    });
  };
  const onPrev = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (isError) {
      toast.error("course has update error");
      // console.log(error);
    } else if (isSuccess) {
      toast.success("Course has update Successfully!");
      dispatch(SuccessCreate());
      //  console.log(data);
      setStep(5);
      // console.log(data);
    }
  }, [isError, isSuccess]);
  return (
    <>
      <div>
        <div className="">
          <div className="flex justify-center">
            {/* <Image src={PinRightIcon} width={540} height={390} alt="" /> */}
          </div>
          <div className="text-center  w-full m-auto mb-56">
            <h2 className="font-semibold text-[1.4rem]">
              Your course has been created Successfully.
            </h2>
            <p className="text-[#8A92A6] font-medium text-sm mt-5 mb-12">
              Course Successfully updated and awaiting admin approval. Expect a
              confirmation email soon. Your commitment to enhancing the course
              is commendable!
            </p>
            <Link href={`/dashboard`}>
              <button className="bg-[#3A57E8] text-[#fff] py-3 px-3 text-sm font-normal rounded-sm">
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creation4;
