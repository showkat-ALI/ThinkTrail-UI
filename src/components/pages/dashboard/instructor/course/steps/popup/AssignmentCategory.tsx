import React, { useEffect, useState } from "react";
import {
  useGetAllAssignmentsofAInstructorQuery,
  useGetModuleAssignmentsQuery,
} from "../../../../../../../feature/api/dashboardApi";
import { useAddModuleAssignmentMutation } from "../../../../../../../feature/api/dashboardApi";
import { toast } from "react-toastify";
import ButtonLoader from "../../../../../../utils/loaders/ButtonLoader";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import { useGetUserQuery } from "../../../../../../../feature/api/authApi";
import { moduleAssignments } from "../../../../../../../feature/moduleAssignment/moduleAssignment";

const AssignmentCategory = ({
  id,
  setShowModal,
}: {
  id: string;
  setShowModal: any;
}) => {
  const {
    email,
    isDeleted,
    roles,
    needsPasswordChange,
    status,
    passwordChangedAt,
  } = useAppSelector((state: { auth: { user: any } }) => state.auth.user);
  const {
    data: userData,
    isSuccess: userIsSuccess,
    isError: isErrorUser,
  } = useGetUserQuery({});
  const dispatch = useAppDispatch();

  // console.log("me data", userData);

  const {
    data: instructorAssignmentData,
    isSuccess: instructorAssignmentSuccess,
    isError: instructorAssignmentIsError,
    isLoading: instructorAssignmentLoading,
  } = useGetAllAssignmentsofAInstructorQuery(userData?.data._id);
  const [
    updateModule,
    {
      error,
      data: moduleData,
      isLoading: loadingModule,
      isSuccess: moduleisSuccess,
    },
  ] = useAddModuleAssignmentMutation();
  const [assignmentId, setassignmentId] = useState("");
  const [activeClass, setactiveClass] = useState("");

  const clickAssignment = (id: string) => {
    setassignmentId(id);
    setactiveClass(id);
  };
  // const { data: moduleAssignmentData, isLoading: moduleAssgnmntIsLoading, isSuccess: moduleAssgnmntIsSuccess, isError: moduleAssgnmntIsError } = useGetModuleAssignmentsQuery(id, {
  //   skip: !moduleisSuccess, // Skip the query if moduleisSuccess is false
  // });
  // useEffect(() => {
  //     if (moduleAssignmentData) {

  //       dispatch(
  //         moduleAssignments(moduleAssignmentData )
  //       );
  //     }
  //   }, [moduleAssignmentData, dispatch, moduleisSuccess]);
  // const { module } = useAppSelector((state) => state.module);
  const Update = () => {
    updateModule({ module: id, assignment: assignmentId });

    //   console.log(assignmentId,id)
  };
  useEffect(() => {
    if (instructorAssignmentIsError) {
      toast.error((error as any).data.message);
      // console.log(error);
    } else if (moduleisSuccess) {
      toast.success("Module has updated Successfully!");
      //  console.log(data);
      setShowModal(false);
    }
  }, [instructorAssignmentIsError, moduleisSuccess]);
  return (
    <>
      <div>
        <div>
          <p className="text-[#8A92A6] text-[16px] mb-3 leading-[19px]">
            Select the assignment you want to associate with this module or add
            an assignment by selecting “Create Assignment”.
          </p>
        </div>
        <div
          className="bg-[#fff] p-3 px-5 rounded"
          style={{ boxShadow: "0px 1px 15px rgba(0, 0, 0, 0.15)" }}
        >
          <Link href={`/dashboard/assignment-creation`}>
            <h2 className="cursor-pointer text-[#3A57E8] underline font-medium mb-2 text-base">
              Create Assignment
            </h2>
          </Link>
          <div>
            <ul className="flex flex-col gap-[10px] text-[#8A92A6] text-[15px] mb-2 h-[12rem] overflow-y-scroll	">
              {/* {roles?.includes("superAdmin") &&
                (instructorAssignmentLoading ? (
                  <div>Loading....</div>
                ) : instructorAssignmentIsError ? (
                  <div>Error....</div>
                ) : instructorAssignmentSuccess &&
                  instructorAssignmentData?.data?.assignments &&
                  instructorAssignmentData?.data?.assignments?.length > 0 ? (
                  instructorAssignmentData?.data?.assignments.map(
                    (
                      { name, _id }: { name: string; _id: string },
                      index: string
                    ) => (
                      <li
                        key={index}
                        onClick={() => clickAssignment(_id)}
                        className={`${
                          activeClass == id && "text-[#3A57E8]"
                        } hover:text-[#da7b4f] cursor-pointer`}
                      >
                        Assignment {index + 1} - {name}
                      </li>
                    )
                  )
                ) : (
                  <div>No assignment found</div>
                ))} */}
              {(roles?.includes("instructor") ||
                roles?.includes("superAdmin")) &&
                (instructorAssignmentLoading ? (
                  <div>Loading....</div>
                ) : instructorAssignmentIsError ? (
                  <div>Error....</div>
                ) : instructorAssignmentSuccess &&
                  instructorAssignmentData?.data?.assignments &&
                  instructorAssignmentData?.data?.assignments.length > 0 ? (
                  instructorAssignmentData?.data?.assignments.map(
                    (
                      { name, _id }: { name: string; _id: string },
                      index: string
                    ) => (
                      <li
                        key={index}
                        onClick={() => clickAssignment(_id)}
                        className={`${
                          activeClass === _id ? "text-[#3A57E8]" : ""
                        } hover:text-[#da7b4f] cursor-pointer`}
                      >
                        Assignment {index + 1} - {name}
                      </li>
                    )
                  )
                ) : (
                  <div>No assignment found</div>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={() => setShowModal(false)}
          data-modal-hide="staticModal"
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cancel
        </button>
        <button
          onClick={Update}
          data-modal-hide="staticModal"
          type="button"
          disabled={loadingModule}
          className="text-gray-500 flex bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          {loadingModule ? (
            <>
              <ButtonLoader />
              loading ...
            </>
          ) : (
            "Add Item"
          )}
        </button>
      </div>
    </>
  );
};

export default AssignmentCategory;
