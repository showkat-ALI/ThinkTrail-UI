import { useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import TableController from "../common/TableController";
import CoursesCategoriesSection from "./courses-categories";
import CourseTable from "./courses-list/CourseTable";
import CoursesRequestTable from "./courses-request/CoursesRequestTable";
import Nav from "./Nav";
import StudentPerformance from "./StudentPerformance";
import TestSummery from "./TestSummery";
import dynamic from "next/dynamic";
export type ActiveTab =
  | "courses-list"
  | "courses-request"
  | "courses-categories";

const Courses = () => {
  const {
    user: { roles },
  } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<ActiveTab>("courses-list");
  const [CreateCategoryModal, setCreateCategoryModal] =
    useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7">
          <StudentPerformance />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <TestSummery />
        </div>
      </div>
      <div className="py-[40px] bg-[#ffffff] px-4 mt-6">
        {/* Nav */}
        <Nav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          Modal={CreateCategoryModal}
          setShowModal={setCreateCategoryModal}
        />
        {/* table controller  */}
        {activeTab !== "courses-categories" && <TableController />}
        {/* table  */}
        {activeTab === "courses-list" ? (
          <CourseTable />
        ) : activeTab === "courses-request" ? (
          <CoursesRequestTable />
        ) : (
          activeTab === "courses-categories" && (
            <CoursesCategoriesSection
              Modal={CreateCategoryModal}
              setShowModal={setCreateCategoryModal}
            />
          )
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Courses), { ssr: false });
