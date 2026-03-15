"use client"
import React, { useState, useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../redux-hook/hooks";
import { Course } from "../../../../../feature/course/courseSlice";

//component
import Creation1 from "./steps/Creation1";
import Creation2 from "./steps/Creation2";
import Creation3 from "./steps/Creation3";
import Creation4 from "./steps/Creation4";
import CourseCreationSuccessful from "./steps/CourseCreationSuccessful";

export type InitialFormDataCourse = {
  title: string;
  shortDescription: string;
  language: string;
  durationInMinutes: number;
  price: number;
  level: string;
  featured?: boolean;
  numberOfLectures: number;
  discountPrice: number;
  isDiscount?: boolean;
  description: string;
  videoUrl: string;
  fileUrl: string;
};

const DEFAULT_FORM_DATA: InitialFormDataCourse = {
  title: "",
  shortDescription: "",
  language: "",
  durationInMinutes: 0,
  price: 0,
  level: "",
  featured: false,
  numberOfLectures: 0,
  discountPrice: 0,
  isDiscount: false,
  description: "",
  videoUrl: "",
  fileUrl: "",
};

// Keep name alias so existing child component imports still work
const InitialFormDataCourse = DEFAULT_FORM_DATA;

const FORM_DATA_KEY = "course_creation_form_data";
const COURSE_STATE_KEY = "course_creation_course_state";

const CourseCreationMain = () => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.course);

  // Restore formData from localStorage so step 1 fields survive a reload
  const [formData, setFormData] = useState<InitialFormDataCourse>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(FORM_DATA_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_FORM_DATA;
      } catch {
        return DEFAULT_FORM_DATA;
      }
    }
    return DEFAULT_FORM_DATA;
  });

  const [step, setStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("course_creation_step");
      return saved ? Number(saved) : 1;
    }
    return 1;
  });

  // On mount: re-hydrate Redux course state (course._id) from localStorage
  // so step 4 can call updateCourse after a reload at step 3+
  useEffect(() => {
    if (!course._id) {
      try {
        const saved = localStorage.getItem(COURSE_STATE_KEY);
        if (saved) dispatch(Course(JSON.parse(saved)));
      } catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist Redux course state whenever step 2 sets the course _id
  useEffect(() => {
    if (course._id) {
      localStorage.setItem(COURSE_STATE_KEY, JSON.stringify(course));
    }
  }, [course._id]);

  // Persist formData on every change so step 1 fields survive a reload
  useEffect(() => {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
  }, [formData]);

  // Persist step; clear ALL keys when the flow completes at step 5
  useEffect(() => {
    if (step === 5) {
      localStorage.removeItem("course_creation_step");
      localStorage.removeItem(FORM_DATA_KEY);
      localStorage.removeItem(COURSE_STATE_KEY);
    } else {
      localStorage.setItem("course_creation_step", String(step));
    }
  }, [step]);

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrev = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div
        className="course_creation sm:p-3 xsm:p-[2px] lg:p-5 md:p-5 md:bg-[red]"
        style={{ background: "#fff" }}
      >
        {step === 5 ? (
          <CourseCreationSuccessful onPrev={onPrev} onNext={onNext} />
        ) : (
          <div className="step-indicator flex items-center ">
            <div className="flex items-center flex-col z-10 relative">
              <div className={`${step === 1 ? "activeBorder" : ""}`}>
                <div
                  className={`${
                    step === 1 ? "activeBg" : ""
                  } m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}
                >
                  1
                </div>
              </div>
              <p className="text-[10px] sm:text-[12px]  lg:text-base font-medium mt-2">
                Course Details
              </p>
            </div>
            <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
            <div className="flex items-center flex-col z-10 relative">
              <div className={`${step === 2 ? "activeBorder" : ""}`}>
                <div
                  className={`${
                    step === 2 ? "activeBg" : ""
                  } m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}
                >
                  2
                </div>
              </div>
              <p className="text-[10px] sm:text-[12px]   lg:text-base font-medium mt-2">
                Course Media
              </p>
            </div>
            <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
            <div className="flex items-center flex-col z-10 relative">
              <div className={`${step === 3 ? "activeBorder" : ""}`}>
                <div
                  className={`${
                    step === 3 ? "activeBg" : ""
                  } m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}
                >
                  3
                </div>
              </div>
              <p className="text-[10px] sm:text-[12px]  lg:text-base font-medium mt-2">
                Curriculum
              </p>
            </div>
            <div className="indicator-line  w-[100%] h-[1px] bg-[#ADB5BD] flex-1 mb-5"></div>
            <div className="step step3  flex items-center flex-col z-10 relative">
              <div className={`${step === 4 ? "activeBorder" : ""}`}>
                <div
                  className={`${
                    step === 4 ? "activeBg" : ""
                  } m-[2px] sm:m-1 w-[35px] h-[35px] sm:w-[39px] sm:h-[39px] lg:w-[54px] lg:h-[54px] text-center relative text-[#8A92A6] rounded-full bg-[#EBEEFD] flex items-center justify-center text-[27px] font-semibold`}
                >
                  4
                </div>
              </div>
              <p className="text-[10px] sm:text-[12px]   lg:text-base font-medium mt-2">
                Additional Information
              </p>
            </div>
          </div>
        )}
        {step === 1 ? (
          <Creation1
            setFormData={setFormData}
            setStep={setStep}
            formData={formData}
            step={step}
          />
        ) : step === 2 ? (
          <Creation2
            setFormData={setFormData}
            setStep={setStep}
            formData={formData}
            step={step}
          />
        ) : step === 3 ? (
          <Creation3
            setFormData={setFormData}
            setStep={setStep}
            formData={formData}
            step={step}
          />
        ) : (
          step === 4 && (
            <Creation4
              setFormData={setFormData}
              setStep={setStep}
              formData={formData}
              step={step}
            />
          )
        )}
      </div>
    </>
  );
};

export default CourseCreationMain;
