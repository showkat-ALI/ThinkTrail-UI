"use client"
import AssignementNaming from "./AssignementNaming";
import AssignmentDue from "./AssignmentDue";
import AssignmentFile from "./AssignmentFile";
import AssignmentScoreDeclare from "./AssignmentScoreDeclare";
import AssignmentUploadButtons from "./AssignmentUploadButtons";
import UploadFileTypes from "./UploadFileTypes";
import * as z from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState, Fragment, useMemo, useEffect } from "react";
import { useCreateAssignmentMutation } from "../../../../../feature/api/dashboardApi";
import { useSingleFileUploadMutation } from "../../../../../feature/api/mediaUploadApi";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "../../../../../feature/api/authApi";

type assignmentType = {
  name: string;
  description: string;
  fileUrl: string;
  comment: string;
  score: number;
  submissionAttempts: string;
  availFrom: string;
  availUntil: string;
};

const assignmentData = {
  name: "",
  description: "",
  fileUrl: "",
  comment: "",
  score: 0,
  submissionAttempts: "choose attempt",
  availFrom: "",
  availUntil: "",
};

const AssignmentCreation = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<assignmentType>(assignmentData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<assignmentType>({
    defaultValues: {
      name: formData.name,
      description: formData.description,
      fileUrl: formData.fileUrl,
      comment: formData.comment,
      score: formData.score,
      submissionAttempts: formData.submissionAttempts,
      availFrom: formData.availFrom,
      availUntil: formData.availUntil,
    },
  });

  const [createAssignment, { error, data, isLoading, isSuccess, isError }] =
    useCreateAssignmentMutation();
  const {
    data: userData,
    isSuccess: userIsSuccess,
    isError: userIsError,
  } = useGetUserQuery({});

  const assignmentHandler = (data: assignmentType) => {
    if (!data.fileUrl) {
      alert("please select assignment file");
    }
    setFormData((prev: assignmentType) => ({ ...prev, ...data }));
    console.log(data);
    const createdAssignment = { ...data, createdBy: userData?.data._id };
    createAssignment(createdAssignment);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.error("Assignment has added error");
    } else if (isSuccess) {
      toast.success("Assignment has Added Successfully!");
      router.push(`/dashboard/assignment/all-assignments`);
    }
  }, [isError, isSuccess]);

  return (
    <div className="grid  lg:grid-cols-12 w-full justify-between gap-x-8">
      <div className="lg:col-span-8  col-span-12">
        <form onSubmit={handleSubmit(assignmentHandler)}>
          <AssignementNaming
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <AssignmentFile
            setValue={setValue}
            errors={errors}
            register={register}
          />
          <UploadFileTypes register={register} errors={errors} />
          <div className="hidden lg:block">
            <AssignmentUploadButtons isLoading={isLoading} />
          </div>
        </form>
      </div>
      <div className="lg:col-span-4 col-span-12 ">
        <form onSubmit={handleSubmit(assignmentHandler)}>
          <AssignmentScoreDeclare register={register} errors={errors} />
          <AssignmentDue register={register} errors={errors} />
          <div className="block lg:hidden">
            <AssignmentUploadButtons isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentCreation;
