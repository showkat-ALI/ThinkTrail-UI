import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputErrorMessage } from "../../../../utils/error";
import "react-quill/dist/quill.snow.css";
import { useAddAcademicSemesterMutation } from "../../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";

type RegistrationFirstStepFromData = {
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
};

const CreateSemester = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFirstStepFromData>();

  const [addAcademicSemester, { error, data, isLoading, isSuccess, isError }] =
    useAddAcademicSemesterMutation();

  const submitFirstStep = async (data: RegistrationFirstStepFromData) => {
    console.log("Form data", data);
    await addAcademicSemester(data).unwrap();
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    } else if (isSuccess) {
      toast.success("Semester has been added successfully!");
      console.log(data);
    }
  }, [isError, isSuccess, data, error]);

  return (
    <>
      <form onSubmit={handleSubmit(submitFirstStep)}>
        <div className="course_creation p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Course details</h2>

          <div className="from_middel lg:flex md:flex gap-7 sm:block">
            <div className="from_lft lg:w-3/6 sm:w-full">
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">Semester Name</label>
                <br />
                <select
                  {...register("name", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px   15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value="">{"Select Semester Name"}</option>
                  {["Autumn", "Summer", "Fall"].map((key, value) => (
                    <option value={key} key={value}>
                      {key}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.name && (
                    <InputErrorMessage message={"Enter your Semester Name"} />
                  )}
                </div>
              </div>

              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">Semester Year</label>
                <br />
                <select
                  {...register("year", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select Year"}</option>
                  {Array.from(
                    { length: 20 },
                    (_, i) => new Date().getFullYear() + i
                  ).map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.year && <InputErrorMessage message={"Enter Year"} />}
                </div>
              </div>
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">Code</label>
                <br />
                <select
                  {...register("code", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select Code"}</option>
                  {["01", "02", "03"].map((code) => (
                    <option value={code} key={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.code && <InputErrorMessage message={"Enter Code"} />}
                </div>
              </div>
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">Start Month</label>
                <br />
                <select
                  {...register("startMonth", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select Start Month"}</option>
                  {Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleString("default", { month: "long" })
                  ).map((month) => (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.startMonth && (
                    <InputErrorMessage message={"Enter Start Month"} />
                  )}
                </div>
              </div>
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">End Month</label>
                <br />
                <select
                  {...register("endMonth", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select End Month"}</option>
                  {Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleString("default", { month: "long" })
                  ).map((month) => (
                    <option value={month} key={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.endMonth && (
                    <InputErrorMessage message={"Enter End Month"} />
                  )}
                </div>
              </div>

              <div className="submit_btn mt-7 flex justify-end ">
                <button
                  type="submit"
                  className="xsm:w-full sm:w-full lg:w-[7rem]  bg-[#3A57E8]"
                  style={{ color: " #fff", padding: "9px 23px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateSemester;
