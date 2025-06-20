"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputErrorMessage } from "../../../../utils/error";
import "react-quill/dist/quill.snow.css";
import {
  useAddAcademicDepartmentMutation,
  useAddAcademicSemesterMutation,
  useGetAllAcademicSemestersQuery,
} from "../../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";

type RegistrationFirstStepFromData = {
  name: string;
  academicSemester: string;
};

const AcademicDepartment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFirstStepFromData>();

  const [
    AddAcademicDepartment,
    { error, data, isLoading, isSuccess, isError },
  ] = useAddAcademicDepartmentMutation();
  const {
    data: allAcademicSemesterData,
    error: semesterErr,
    isLoading: semesterLoading,
    isError: semesterError,
    isSuccess: semesterSuccess,
  } = useGetAllAcademicSemestersQuery({});
  console.log(allAcademicSemesterData);
  const submitFirstStep = async (data: RegistrationFirstStepFromData) => {
    console.log("Form data", data);
    await AddAcademicDepartment(data).unwrap();
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as any).data.message);
    } else if (isSuccess) {
      toast.success("Department has been added successfully!");
    }
  }, [isError, isSuccess, data, error]);
  const AcademicDepartments = [
    "EEE",
    "CSE",
    "CIVIL",
    "ManageMent",
    "Accounting",
    "Software Engineering",
  ];
  return (
    <>
      <form onSubmit={handleSubmit(submitFirstStep)}>
        <div className="course_creation p-3 mt-5">
          <h2 className="font-semibold text-2xl mb-5">Course details</h2>

          <div className="from_middel lg:flex md:flex gap-7 sm:block">
            <div className="from_lft lg:w-3/6 sm:w-full">
              <div className="form_control h-[7rem]">
                <label className="text-sm font-medium">Department Name</label>
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
                  <option value="">{"Select department Name"}</option>
                  {AcademicDepartments.map((key, value) => (
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
                <label className="text-sm font-medium">Select Semester</label>
                <br />
                <select
                  {...register("academicSemester", { required: true })}
                  className="mt-3 text-[#8A92A6]"
                  style={{
                    boxShadow: "0px 1px 15px rgb(0 0 0 / 15%)",
                    borderRadius: "8px",
                    width: "100%",
                    border: "none",
                    padding: " 11px 17px",
                  }}
                >
                  <option value={""}>{"Select Semester"}</option>
                  {allAcademicSemesterData?.data?.map((semester: any) => (
                    <option value={semester?._id} key={semester._id}>
                      {semester.name} - {semester.year}
                    </option>
                  ))}
                </select>
                <div className="">
                  {errors.academicSemester && (
                    <InputErrorMessage message={"Enter Semester"} />
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

export default AcademicDepartment;
