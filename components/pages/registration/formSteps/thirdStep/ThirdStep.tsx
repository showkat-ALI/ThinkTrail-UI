import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { InputErrorMessage } from "../../../../utils/error";
import { StepProps } from "../firstStep/FirstStep";

type RegistrationThirdStepFromData = {
  
  permanentAddress:string;
  presentAddress:string;
  
};

const ThirdStep = (props: StepProps) => {
  const { setStep, setFormData, formData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationThirdStepFromData>({
    defaultValues: {
      presentAddress:formData.presentAddress,
      permanentAddress:formData.permanentAddress
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
            htmlFor="presentAddress"
          >
            Present Address
          </label>
          <input
            type="text"
            {...register("presentAddress", { required: true })}
            className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] lg:w-full xl:w-full md:w-full sm:w-full xsm:w-72"
          />
          {errors.presentAddress && (
            <InputErrorMessage message={"What is your presentAddress"} />
          )}
        </div>
        <div className={"flex flex-col font-nunito "}>
          <label
            className="mb-1 text-sm font-bold text-gray-900 "
            htmlFor="presentAddress"
          >
            Permanent Address
          </label>
          <input
            type="text"
            {...register("permanentAddress", { required: true })}
            className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] lg:w-full xl:w-full md:w-full sm:w-full xsm:w-72"
          />
          {errors.permanentAddress && (
            <InputErrorMessage message={"What is your permanentAddress"} />
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
