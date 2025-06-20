"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputErrorMessage } from "../../../../utils/error";
import "react-quill/dist/quill.snow.css";
import {
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepartmentsQuery,
} from "../../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";

type RegistrationFirstStepFromData = {
  name: string;
  academicDepartment: string;
};

const AcademicFaculty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFirstStepFromData>();

  const [AddAcademicFaculty, { error, data, isLoading, isSuccess, isError }] =
    useAddAcademicFacultyMutation();
  const {
    data: AllAcademicDepartments,
    error: deptErr,
    isLoading: deptLoading,
    isError: deptERRor,
    isSuccess: deptSuccess,
  } = useGetAllAcademicDepartmentsQuery({});
  console.log(AllAcademicDepartments);
  const submitFirstStep = async (data: RegistrationFirstStepFromData) => {
    await AddAcademicFaculty(data).unwrap();
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    } else if (isSuccess) {
      toast.success("Academic Faculty has been added successfully!");
    }
  }, [isError, isSuccess, data, error]);
  const AcademicFaculties = [
    "Faculty of MATHMATICS",
    "Faculty of Science",
    "Faculty of EEE",
    "Faculty of CSE",
    "Faculty of MME",
    "Faculty of ENGLISH",
    "Faculty of ARCH",
    "Faculty of ME",
    "Faculty of BENGALI",
    "Faculty of SOCIOLOGY",
  ];
  return (
    <>
      <form onSubmit={handleSubmit(submitFirstStep)}>
        <div className="course_creation p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Course details</h2>

          <div className="from_middel lg:flex md:flex gap-7 sm:block">
            <div className="from_lft lg:w-3/6 sm:w-full">
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">
                  Select Academic Faculty Name
                </label>
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
                  <option value="">{"Select Faculty Name"}</option>
                  {AcademicFaculties.map((key, value) => (
                    <option value={key} key={value}>
                      {key}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.name && (
                    <InputErrorMessage message={"Enter your Faculty Name"} />
                  )}
                </div>
              </div>

              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">
                  Select Academic Department
                </label>
                <br />
                <select
                  {...register("academicDepartment", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select Academic Department"}</option>
                  {AllAcademicDepartments?.data?.length > 0 &&
                    AllAcademicDepartments.data.map((semester: any) => (
                      <option value={semester?._id} key={semester?._id}>
                        {semester?.name}-{semester?.academicSemester?.name}-
                        {semester?.academicSemester?.year}
                      </option>
                    ))}
                </select>
                <div className="">
                  {errors.academicDepartment && (
                    <InputErrorMessage message={"Enter Academic department"} />
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

export default AcademicFaculty;
