import React, { useState } from "react";
import SecondStep from "./formSteps/secondStep/SecondStep";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import ThirdStep from "./formSteps/thirdStep/ThirdStep";

import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { SelectOptions } from "./BottomRegisForm";
import Textfield from "../../common/forms/Textfield";
import FirstStep from "./formSteps/firstStep/FirstStep";
import FourthStep from "./formSteps/fourthStep/FourthStep";

export type InitialFormData = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  currentJob: string;
  studentType: string;
  highestStudy: string;
  knowFrom: string;
  agree?: boolean;
};

const initialFormData = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  country: "",
  currentJob: "",
  studentType: "",
  highestStudy: "",
  knowFrom: "",
  agree: false,
};

const TopFormRegistration = () => {
  const [formData, setFormData] = useState<InitialFormData>(initialFormData);
  // console.log("form data", formData);

  let [showOpt, setShowOpt] = useState(0);
  // const [getStep, setGetStep] = useState(3);
  // const [getPhone, setGetphone] = useState("");

  // const options = ["set1", "set2", "set3", "set4"];
  // const formatePhoneNumber = (value: any) => {
  //   if (!value) {
  //     return value;
  //   }
  //   const PhoneNumber = value.replace(/[^\d]/g, "");
  //   const phoneNumeberLength = PhoneNumber.length;
  //   if (phoneNumeberLength < 4) {
  //     return PhoneNumber;
  //   }
  //   if (phoneNumeberLength < 7) {
  //     return `${PhoneNumber.slice(0, 3)} ${PhoneNumber.slice(3)}`;
  //   }
  //   return `${PhoneNumber.slice(0, 3)} ${PhoneNumber.slice(
  //     3,
  //     6
  //   )}-${PhoneNumber.slice(6, 10)}`;
  // };
  // const handlePhoneInp = (e: any) => {
  //   const forMattedPhone = formatePhoneNumber(e.target.value);
  //   setGetphone(forMattedPhone);
  // };
  // enum StateEnum {
  //   Instructor = "Instructor",
  //   HR = "HR",
  //   Sponsor = "Sponsor",
  //   Consulting = "Consulting",
  // }
  // enum CountryEnum {
  //   Instructor = "Instructor",
  //   HR = "HR",
  //   Sponsor = "Sponsor",
  //   Consulting = "Consulting",
  // }

  const displayOption = () => {
    if (showOpt === 0) {
      return (
        <FirstStep
          setStep={setShowOpt}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (showOpt === 1) {
      return (
        <SecondStep
          setStep={setShowOpt}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else if (showOpt === 2) {
      return (
        <ThirdStep
          setStep={setShowOpt}
          setFormData={setFormData}
          formData={formData}
        />
      );
    } else {
      return (
        <FourthStep
          setStep={setShowOpt}
          setFormData={setFormData}
          formData={formData}
        />
      );
    }
  };

  return (
    <div className="bg-gray-300 mt-6 text-black border-2 border-slate-500 h-auto md:w-96 sm:w-96 lg:w-96 xl:w-96 xsm:w-auto ">
      <div className="mx-auto my-[1.3rem]  h-auto w-80 ">
        <h1 className="text-3xl font-bold text-orange-800">
          To Register For An Upcoming Class
        </h1>
        <p className="my-4 font-semibold text-base">
          Answer A Few Questions About Yourself. It Takes Less Then A Minute!
        </p>
        {/* Progress Bar STart */}
        <div
          className="lg:w-full xl:w-full md:w-full sm:w-full xsm:w-60 
        lg:mx-0 xl:mx-0 md:mx-0 sm:mx-0  xsm:mx-auto 
         bg-gray-200  h-2.5 "
        >
          <div
            className={`bg-blue-700 h-2.5 rounded-full ${
              showOpt === 0
                ? "w-1/4"
                : showOpt === 1
                ? "w-2/4"
                : showOpt === 2
                ? "w-3/4"
                : "w-full"
            }`}
          ></div>
        </div>
        {/* Progress Bar end */}

        <div className=" xl:block lg:block md:block sm:block xsm:flex justify-center items-center">
          <h1 className="m">
            {showOpt === 0
              ? "Step 1"
              : showOpt === 1
              ? "Step 2"
              : showOpt === 2
              ? "Step 3"
              : "Step 4"}
          </h1>
        </div>
        {displayOption()}
      </div>
    </div>
  );
};

export default TopFormRegistration;
