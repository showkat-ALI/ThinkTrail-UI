/* eslint-disable react-hooks/exhaustive-deps */
import responsiveStyle from "../../../../../../styles/ContactStyle.module.css";
import { useEffect } from "react"
import Table from "./Table";
import { useGetAllCourseQuery,useGetAllInstructorCourseQuery } from "../../../../../../feature/api/dashboardApi";
import { useAppDispatch } from "../../../../../../app/hooks";
import { DelEditCourse } from "../../../../../../feature/course/courseSlice";
import { useAppSelector } from "../../../../../../app/hooks";

function CourseTable() {
  const {  roles } = useAppSelector((state) => state.auth.user);
  const { data, isSuccess, isError, isLoading } = useGetAllCourseQuery({});
  const { data:instructorCourseData, isSuccess:instructorCourseSuccess, isError:instructorCourseIsError, isLoading:instructorCourseLoading } = useGetAllInstructorCourseQuery({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(DelEditCourse())
  }, [isSuccess])

  //console.log(data);

  return (
    <div
      className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full shadow-md sm:rounded-lg mt-12`}
    >
      {
       roles.includes("admin") && (
       isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : isSuccess && data?.data?.courses && data.data.courses.length > 0 ? (
        <>
          <table className={`w-full text-[16px] md:text-[18px] text-left`}>
            <thead className="text-[#ADB5BD] font-normal">
              <tr>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Courses
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Enroll
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Published Date
                </th>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Price
                </th>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Status
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[#232D42] font-nunito">
              {data.data.courses.map(
                ({
                  title,
                  createdAt,
                  price,
                  isPending,
                  isPublished,
                  id,
                  isActive,
                  totalEnroll,
                  status
                }: {
                  title: string;
                  createdAt: Date;
                  price: number;
                  isPending: boolean;
                  isPublished: boolean;
                  id: string;
                  isActive: boolean;
                  totalEnroll: number;
                  status: string
                }) => (
                  <Table
                    key={id}
                    title={title}
                    createdAt={createdAt}
                    price={price}
                    isPending={isPending}
                    isPublished={isPublished}
                    id={id}
                    isActive={isActive}
                    totalEnroll={totalEnroll}
                    status={status}
                  />
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div className="font-nunito">No course found</div>
      )
    )
    }

    {
     roles.includes("instructor") && (
      instructorCourseLoading ? (
        <div>Loading...</div>
      ) : instructorCourseIsError ? (
        <div>Error...</div>
      ) : instructorCourseSuccess && instructorCourseData?.data?.courses && instructorCourseData.data.courses.length > 0 ? (
        <>
          <table className={`w-full text-[16px] md:text-[18px] text-left`}>
            <thead className="text-[#ADB5BD] font-normal">
              <tr>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Courses
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Enroll
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Published Date
                </th>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Price
                </th>
                <th scope="col" className="py-3 px-6 font-nunito">
                  Status
                </th>
                <th scope="col" className="py-3 px-6 text-center font-nunito">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-[#232D42] font-nunito">
              {instructorCourseData.data.courses.map(
                ({
                  title,
                  createdAt,
                  price,
                  isPending,
                  isPublished,
                  id,
                  isActive,
                  totalEnroll,
                  status
                }: {
                  title: string;
                  createdAt: Date;
                  price: number;
                  isPending: boolean;
                  isPublished: boolean;
                  id: string;
                  isActive: boolean;
                  totalEnroll: number;
                  status: string
                }) => (
                  <Table
                    key={id}
                    title={title}
                    createdAt={createdAt}
                    price={price}
                    isPending={isPending}
                    isPublished={isPublished}
                    id={id}
                    isActive={isActive}
                    totalEnroll={totalEnroll}
                    status={status}
                  />
                )
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div className="font-nunito">No course found</div>
      )
     )
    }
    </div>
  );
}

export default CourseTable;
