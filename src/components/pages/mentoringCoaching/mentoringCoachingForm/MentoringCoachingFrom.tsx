import React, { useEffect } from "react";
import Textfield from "../../../common/forms/Textfield";
import contactLogo from "../../../../assets/contact-us-logo.png";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { InputErrorMessage } from "../../../../components/utils/error/index";
import { useCreateMentoringMutation } from "../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

interface MentoringData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  currentJob: string;
  message: string;
}

const MentoringCoachingFrom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MentoringData>();
  const [mentoringCreate, { error, data, isLoading, isSuccess, isError }] =
    useCreateMentoringMutation();
  const submitMentoringCoachingForm = (data: MentoringData) => {
    mentoringCreate(data);
  };
  useEffect(() => {
    if (isError) {
      toast.error("Mentoring could'nt created");
    }
    if (isSuccess) {
      toast.success("Mentoring Created Successfully");
      reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="container font-nunito">
      <div className="p-[2rem] mt-[-260px]  lg:mt-[-465px] bg-white container md:max-w-[1080px]  pt-16 mb-20 shadow-slate-300 shadow-xl rounded-xl">
        <div className="">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold font-nunito">
              Mentoring and Coaching
            </h1>
          </div>
          <div>
            <div className="text-lg flex font-bold lg:items-center md:items-center lg:justify-center md:justify-center flex-col my-5 text-sky-300">
              <p className="max-w-[500px] text-center font-nunito text-small-text-color">
                Passionate about mentoring and coaching?
              </p>
            </div>
          </div>
        </div>
        <div className=" my-3">
          <form onSubmit={handleSubmit(submitMentoringCoachingForm)}>
            <div className="flex  items-center justify-center flex-wrap gap-3">
              <div className="basis-full sm:basis-[49%] ">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    First Name
                  </label>

                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"text"}
                    // placeholder={placeholder}
                    // name={name}
                    {...register("firstName", { required: true })}
                  />
                </div>
                {errors.firstName && (
                  <InputErrorMessage message={"Name can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <label className="mb-1 font-nunito text-small-text-color">
                  Last Name
                </label>
                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  // type={type}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <InputErrorMessage message={"Name can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <label className="mb-1 font-nunito text-small-text-color">
                  Email
                </label>
                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  // type={type}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <InputErrorMessage message={"Email can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <label className="mb-1 font-nunito text-small-text-color">
                  Phone
                </label>
                <input
                  className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"tel"}
                  // placeholder={placeholder}
                  // name={name}
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <InputErrorMessage message={"Phone can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <SelectOptions
                  label=" Area of interest"
                  name="interest"
                  options={["Mentoring", "Coaching"]}
                  register={{ ...register("interest", { required: true }) }}
                  byDefault="Mentoring"
                />
                {errors.interest && (
                  <InputErrorMessage message={"Interest can't be empty"} />
                )}
              </div>
              <div className="basis-full sm:basis-[49%] flex flex-col font-nunito ">
                <label className=" font-nunito text-small-text-color">
                  Current Job
                </label>
                <input
                  className=" border-[0.5px]  border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                  type={"text"}
                  {...register("currentJob", { required: true })}
                />
                <>
                  {errors.currentJob && (
                    <InputErrorMessage message={"Current Job can't be empty"} />
                  )}
                </>
              </div>
            </div>

            <div className="mx-1 mt-5">
              <p className="mb-2 text-small-text-color ">
                Message to Hiring Manager
              </p>
              <textarea
                placeholder="Type here..."
                aria-label="Message"
                rows={2}
                cols={85}
                className="border-2 border-gray-300 w-full rounded-l-[0.25rem] rounded-r-[0.25rem] p-2"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <InputErrorMessage message={"Message can't be empty"} />
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-[#0d4cf9] hover:bg-[#5177e0]/90 focus:ring-4 focus:outline-none focus:ring-[#0d4cf9]/50 font-medium rounded-lg text-sm px-14 py-3 text-center inline-flex items-center  mr-2 mb-2 my-8 mx-1"
            >
              {isLoading ? (
                <>
                  <Spinner /> loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentoringCoachingFrom;

export const SelectOptions = ({
  label,
  name,
  byDefault,
  onChange,
  className,
  options,
  register,
}: {
  label?: string | undefined;
  name: string;
  byDefault: string;
  onChange?: any;
  className?: string | undefined;
  options: string[];
  register: any;
}) => {
  return (
    <div className="font-nunito">
      <label htmlFor="media" className="block mt-1  text-small-text-color">
        {label}
      </label>
      <select
        name={name}
        id="media"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-l-[0.25rem] rounded-r-[0.25rem]"
        {...register}
      >
        <option disabled={true} value={""}>
          Select an Option
        </option>
        {options.map((item, id) => (
          <option value={item} key={id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
