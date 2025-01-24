import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import * as z from "zod";
import { InputErrorMessage } from "../../../../utils/error";
import { InitialFormData } from "../../TopFormRegistration";

export type StepProps = {
  setStep: (step: number) => void;
  setFormData: Dispatch<SetStateAction<InitialFormData>>;
  formData: InitialFormData;
};

// const registrationFirstStepFromSchema = z.object({
//   title: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
// })

// type RegistrationFirstStepFromData = z.infer<typeof registrationFirstStepFromSchema>
type RegistrationFirstStepFromData = {
  title: string;
  firstName: string;
  lastName: string;
};

const FirstStep = (props: StepProps) => {
  const { setStep, setFormData, formData } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFirstStepFromData>({
    defaultValues: {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
    },
    // resolver: zodResolver(registrationFirstStepFromSchema)
  });

  const submitFirstStep = (data: RegistrationFirstStepFromData) => {
    console.log("first form data", data);
    setStep(1);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <form onSubmit={handleSubmit(submitFirstStep)}>
      <div
        className={`flex flex-col w-full  gap-7 mt-3 font-nunito xl:items-baseline lg:items-baseline md:items-baseline sm:items-baseline xsm:items-center`}
      >
        <div className=" font-bold flex mt-1 xl:justify-start lg:justify-start md:justify-start sm:justify-start xsm:justify-center">
          <div className="">
            <p className="font-bold"> Title:</p>
          </div>
          <div className="flex xl:mx-2 lg:mx-2 md:mx-2 sm:mx-2 xsm:mx-2 ">
            <div>
              <input
                type="radio"
                id="Mr"
                {...register("title", { required: true })}
                value="Mr"
              />
                <label htmlFor="Mr">Mr</label>
            </div>
            <div className="xl:mx-2 lg:mx-2 md:mx-2 sm:mx-2 xsm:mx-2">
              <input
                type="radio"
                id="Mrs"
                {...register("title", { required: true })}
                value="Mrs"
              />{" "}
              <label htmlFor="Mrs">Mrs</label>
            </div>
            <div className="xl:mx-2 lg:mx-2 md:mx-2 sm:mx-2 xsm:mx-2">
              <input
                type="radio"
                id="Ms"
                {...register("title", { required: true })}
                value="Ms"
              />{" "}
              <label htmlFor="Ms">Ms</label>
            </div>
            <div>
              <input
                type="radio"
                id="Dr"
                {...register("title", { required: true })}
                value="Dr"
              />{" "}
              <label htmlFor="Dr">Dr</label>
            </div>
          </div>
        </div>
        {errors.title && <InputErrorMessage message={"Select your title"} />}

        <div
          className={`lg:w-full xl:w-full md:w-full sm:w-full xsm:w-60 ${
            errors.firstName && "border-t-2 border-red-500"
          }`}
        >
          <div
            className={` lg:w-full xl:w-full md:w-full sm:w-full xsm:w-auto flex items-end  bg-slate-100  xsm:px-0 xsm:py-1 lg:px-3 xl:px-3 md:px-3 sm:px-3 lg:py-2 xl:py-2 md:py-2 sm:py-2 `}
          >
            <BsFillPersonFill className=" w-6 h-6 my-auto" />
            <input
              className={`lg:w-full xl:w-full md:w-full sm:w-full  xsm:w-auto outline-none bg-slate-100 lg:ml-2 md:ml-2 sm:ml-2 xl:ml-2 xsm:ml-0 `}
              type={"text"}
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
          </div>
          {errors.firstName && (
            <InputErrorMessage message={"Enter your first name"} />
          )}
        </div>

        <div
          className={`lg:w-full xl:w-full md:w-full sm:w-full xsm:w-60 ${
            errors.lastName && "border-t-2 border-red-500"
          }`}
        >
          <div className=" lg:w-full xl:w-full md:w-full sm:w-full xsm:w-auto  flex items-end bg-slate-100 xsm:px-0 xsm:py-1 lg:px-3 xl:px-3 md:px-3 sm:px-3 lg:py-2 xl:py-2 md:py-2 sm:py-2 ">
            <BsFillPersonFill className="w-6 h-6 my-auto" />
            <input
              className="lg:w-full xl:w-full md:w-full sm:w-full  xsm:w-auto outline-none bg-slate-100 lg:ml-2 md:ml-2 sm:ml-2 xl:ml-2 xsm:ml-0"
              type={"text"}
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>
          {errors.lastName && (
            <InputErrorMessage message={"Enter your last name"} />
          )}
        </div>
      </div>
      <div className={`flex  justify-center gap-7 items-center mt-3`}>
        <button
          type="submit"
          className={`w-36 h-10 rounded-lg text-white text-center  px-2 py-1 bg-blue-700 font-bold text-lg`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default FirstStep;
