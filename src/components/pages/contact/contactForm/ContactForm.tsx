import React, { useEffect } from "react";
import Textfield from "../../../common/forms/Textfield";
import contactLogo from "../../../../assets/contact-us-logo.png";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { InputErrorMessage } from "../../../utils/error/index";
import {
  useSendContactMutation,
  useGetAllActiveCourseQuery,
} from "../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
      phone: "",
      message: "",
      interest: "",
      found: "",
    },
  });
  const [sendContact, { error, data, isLoading, isSuccess, isError }] =
    useSendContactMutation();
  const {
    data: courseData,
    isSuccess: courseSuccess,
    isError: courseIsError,
    isLoading: courseLoading,
  } = useGetAllActiveCourseQuery({});

  const formHandler = (data: any) => {
    sendContact(data);
  };
  useEffect(() => {
    if (isError) {
      toast.error("Email send Errro");
      //   console.log(error);
    } else if (isSuccess) {
      toast.success("Email Send Successfully!");
      reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="container font-nunito  lg:mx-auto md:mx-auto  xl:mx-auto">
      <div className="p-[2rem] sm:p-[1rem] xsm:p-[1rem] mt-[-260px]  lg:mt-[-300px]  sm:max-w-[650px] xsm:max-w-[400px] bg-white mx-auto md:max-w-[950px]    mb-10 shadow-slate-300 shadow-xl rounded-xl">
        <div className="container  ">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold ">Connect With Us</h1>
          </div>
          <div>
            <div className="text-sm flex lg:items-center md:items-center lg:justify-center md:justify-center flex-col my-5 text-gray-400">
              <p>
                For general inquires, Partnership Requests, and Collaborations.
              </p>
              <p className="my-2">
                kindly fill out the form below and a member from our staff will
                get back to you within 48 hours with
              </p>
              <p>Actionable Steps.</p>
            </div>
          </div>
        </div>
        <div className=" ">
          <form onSubmit={handleSubmit(formHandler)}>
            <div className="flex justify-center items-center flex-wrap gap-3">
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"First Name"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"text"}
                    {...register("firstName", { required: true })}
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"Last Name"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"text"}
                    {...register("lastName", { required: true })}
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"Email Address"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"email"}
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"Company"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"text"}
                    {...register("company", { required: true })}
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"Job Title"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"text"}
                    {...register("jobTitle", { required: true })}
                  />
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <div className={"flex flex-col font-nunito "}>
                  <label className="mb-1 font-nunito text-small-text-color">
                    {"Phone"}:
                  </label>
                  <input
                    className=" border-[0.5px] border-gray-200  rounded-r-[0.25rem] rounded-l-[0.25rem] px-[0.45rem] py-[0.45rem] bg-"
                    type={"tel"}
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="my-5  mx-1">
              <p className="mb-2 text-small-text-color">
                Message to Hiring Manager
              </p>
              <textarea
                placeholder="Type here..."
                aria-label="Message"
                rows={2}
                cols={85}
                {...register("message", { required: true })}
                className="border-[1px] rounded-r-[0.25rem] rounded-l-[0.25rem] p-2 border-gray-300 w-full"
              ></textarea>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-3">
              <div className="basis-full sm:basis-[49%]">
                <div className="font-nunito">
                  <label
                    htmlFor="media"
                    className="block mb-1 text-small-text-color"
                  >
                    {"Program of interest"}
                  </label>
                  <select
                    {...register("interest", { required: true })}
                    id="media"
                    className="bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 text-small-text-color text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value={""}>{"Select an option"}</option>
                    {courseSuccess &&
                      courseData.data.courses.map((item: any) => (
                        <option value={item.title} key={item._id}>
                          {item.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="basis-full sm:basis-[49%]">
                <SelectOptions
                  label=" How did you find Fourth IT Academy"
                  byDefault="Select an option"
                  name="found"
                  register={register}
                  options={["Twitter", "Instagram", "Facebook", "Linkedin"]}
                />
              </div>
            </div>
            <div className=" my-8 mx-1">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white cursor-pointer bg-[#0d4cf9] hover:bg-[#5177e0]/90 focus:ring-4 focus:outline-none focus:ring-[#0d4cf9]/50 font-medium rounded-lg text-sm px-14 py-3 text-center inline-flex items-center  mr-2 mb-2"
              >
                {isLoading ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const SelectOptions = ({
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
      <label htmlFor="media" className="block mb-1 text-small-text-color">
        {label}
      </label>
      <select
        {...register(name, { required: true })}
        id="media"
        className="bg-gray-50 border rounded-l-[0.25rem] rounded-r-[0.25rem] border-gray-300 text-small-text-color text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value={""}>{byDefault}</option>
        {options.map((item, id) => (
          <option value={item} key={id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContactForm;
