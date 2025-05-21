import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useCreateAdmissionRequestMutation,
  useGetAllAcademicDepartmentsQuery,
  useGetAllAcademicSemestersQuery,
  useGetCurrentSemesterQuery,
} from "../../../../../feature/api/dashboardApi";
import { useAppSelector } from "../../../../../app/hooks";
import { useGetUserQuery } from "../../../../../feature/api/authApi";

type FormValues = {
  program: string;
  year: string;
  semester: string;
  agreeTerms: boolean;
};

export default function TakeAdmission() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const [success, setSuccess] = React.useState(false);

  const {
    refresh,
    user: { email, roles, id, },
  } = useAppSelector((state) => state.auth);
  const {
    data: allAcademicSemesterData,
    error: semesterErr,
    isLoading: semesterLoading,
    isError: semesterError,
    isSuccess: semesterSuccess,
  } = useGetCurrentSemesterQuery({});
  const { data, error, isLoading, isError, isSuccess } =
    useGetAllAcademicDepartmentsQuery({});
  const [
    createAdmission,
    {
      data: admissionData,
      error: admissionError,
      isLoading: isAdmissionLoading,
      isError: isAdmissionError,
      isSuccess: isAdmissionSuccess,
    },
  ] = useCreateAdmissionRequestMutation({});
   const {
      data: userData,
      isSuccess: userIsSuccess,
      isError: isErrorUser,
    } = useGetUserQuery({});
  console.log(userData, "userData");
  const onSubmit = async (data: FormValues) => {
    try {
      createAdmission({ ...data, email: email, id: id, roles: roles, status: "pending", isDeleted: false });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Start Your Learning Journey
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Apply for admission to our programs and unlock a world of knowledge
            and opportunities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-indigo-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Admission Request Form
            </h2>
            <p className="mt-1 text-indigo-100">
              Please fill out the form below to submit your admission request.
            </p>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            {isAdmissionSuccess && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <p className="font-bold">Success!</p>
                <p>
                  Your admission request has been submitted. We&apos;ll review
                  your application and contact you soon.
                </p>
              </div>
            )}
            {isAdmissionError && (
              <div className="mb-6 p-4 bg-amber-500-100 border border-green-400 text-red-700 rounded">
                <p>
                  Your admission request has been submitted. We&apos;ll review
                  your application and contact you soon.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Program Selection */}
                <div>
                  <label
                    htmlFor="program"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="program"
                    {...register("program", {
                      required: "Program selection is required",
                    })}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                      errors.program ? "border-red-300" : "border"
                    }`}
                  >
                    <option value="">-- Select a program --</option>
                    {data?.data?.map((semester: any) => (
                      <option value={semester?._id} key={semester._id}>
                        {semester.name}
                      </option>
                    ))}
                  </select>
                  {errors.program && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.program.message}
                    </p>
                  )}
                </div>

                {/* Semester Selection */}
                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="semester"
                    {...register("semester", {
                      required: "Semester selection is required",
                    })}
                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${
                      errors.semester ? "border-red-300" : "border"
                    }`}
                  >
                    <option value="">-- Select semester --</option>
                    {
                      <option value={allAcademicSemesterData?.data?._id} >
                        {allAcademicSemesterData?.data?.name} - {allAcademicSemesterData?.data?.year}
                      </option>
                    }
                  </select>
                  {errors.semester && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.semester.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    {...register("agreeTerms", {
                      required: "You must agree to the terms and conditions",
                    })}
                    className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded ${
                      errors.agreeTerms ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="agreeTerms"
                    className="font-medium text-gray-700"
                  >
                    I agree to the{" "}
                    <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      terms and conditions
                    </span>{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    By submitting this form, you agree to our admission policies
                    and procedures.
                  </p>
                  {errors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.agreeTerms.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Need help with your application?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Contact our admissions office at{" "}
              <span className="text-indigo-600">admissions@lms.edu</span> or
              call <span className="text-indigo-600">(123) 456-7890</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
