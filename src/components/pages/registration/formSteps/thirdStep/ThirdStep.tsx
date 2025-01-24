import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { InputErrorMessage } from "../../../../utils/error";
import { StepProps } from "../firstStep/FirstStep";

type RegistrationThirdStepFromData = {
  currentJob: string;
  studentType: string;
  highestStudy: string;
  knowFrom: string;
};

const ThirdStep = (props: StepProps) => {
  const { setStep, setFormData, formData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationThirdStepFromData>({
    defaultValues: {
      currentJob: formData.currentJob,
      studentType: formData.studentType,
      highestStudy: formData.highestStudy,
      knowFrom: formData.knowFrom,
    },
    // resolver: zodResolver(registrationFirstStepFromSchema)
  });

  const submitThirdStep = (data: RegistrationThirdStepFromData) => {
    console.log("third form data", data);
    setStep(3);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <form onSubmit={handleSubmit(submitThirdStep)}>
      <div className="flex flex-col w-full  gap-[0.5rem] mt-[0.4rem] font-nunito ">
        <div className={"flex flex-col font-nunito "}>
          <label
            className="mb-1 text-sm font-bold text-gray-900 "
            htmlFor="currentJob"
          >
            What Is Your Current Job?
          </label>
          <input
            type="text"
            {...register("currentJob", { required: true })}
            className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] lg:w-full xl:w-full md:w-full sm:w-full xsm:w-72"
          />
          {errors.currentJob && (
            <InputErrorMessage message={"What is your current job"} />
          )}
        </div>

        <div>
          <label
            htmlFor="media"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Are You A Self-Paced or Instructor-Led
          </label>
          <select
            {...register("studentType", { required: true })}
            id="media"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
          >
            <option value={""}>{"Select Any Type"}</option>
            {["self-pace", "instructor-led"].map((item, id) => (
              <option value={item} key={id} className="capitalize">
                {item}
              </option>
            ))}
          </select>
          {errors.studentType && (
            <InputErrorMessage message={"Select any type"} />
          )}
        </div>

        <div>
          <label
            htmlFor="media"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Highest Level Of Education
          </label>
          <select
            {...register("highestStudy", { required: true })}
            id="media"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
          >
            <option value={""}>
              {"Select Highest Level Of Your Education"}
            </option>
            {[
              "Some high school",
              "High school diploma or GED",
              "Bachelor's degree ",
              "Some graduate coursework",
              "Graduate degree",
            ].map((item, id) => (
              <option value={item} key={id}>
                {item}
              </option>
            ))}
          </select>
          {errors.highestStudy && (
            <InputErrorMessage
              message={"Select highest level of your education"}
            />
          )}
        </div>

        <div>
          <label
            htmlFor="media"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            How Did You Hear About Us?
          </label>
          <select
            {...register("knowFrom", { required: true })}
            id="media"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 lg:w-full xl:w-full md:w-full sm:w-full xsm:w-3/4 xl:p-2.5 lg:p-2.5 md:p-2.5 sm:p-2.5 xsm:p-2"
          >
            <option value={""}>{"How Did You Hear About Us?"}</option>
            {["Twitter", "Facebook", "Linkedin", "Others"].map((item, id) => (
              <option value={item} key={id}>
                {item}
              </option>
            ))}
          </select>
          {errors.highestStudy && (
            <InputErrorMessage message={"Select how did you hear about us"} />
          )}
        </div>
      </div>

      <div className={`flex  justify-center gap-7 items-center mt-3`}>
        <button
          className={`w-36 h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700 font-bold text-lg`}
          type="button"
          onClick={() => setStep(1)}
        >
          Back
        </button>

        <button
          type="submit"
          className={`font-bold text-lg w-36 h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ThirdStep;
