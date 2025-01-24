import { useState } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import TableController from "../common/TableController";
import AdmissionTable from "./AdmissionTable";
import MentoringTable from "./MentoringTable";
import OptimizationTable from "./OptimizationTable";
import StudentsListTable from "./StudentsListTable";

function Students() {
  const {
    user: { roles },
  } = useAppSelector((state) => state.auth);
  const [showTable, setShowTable] = useState("students");

  // what to render table
  let render = null;
  if (showTable === "students") {
    render = <StudentsListTable />;
  } else if (showTable === "admission") {
    render = <AdmissionTable />;
  } else if (showTable === "mentoring") {
    render = <MentoringTable />;
  } else if (showTable === "optimization") {
    render = <OptimizationTable />;
  }
  // ["student","instrucor"].

  return (
    <>
      <div className="py-[40px]">
        <div className="flex items-center space-x-2 md:space-x-4 mb-[40px] text-[16px] md:text-[20px] lg:text-[26px] border-b font-nunito">
          <button
            onClick={() => setShowTable("students")}
            className={` font-medium
            font-nunito
             ${
               showTable === "students"
                 ? "text-[#232D42] border-b-2 border-[#3A57E8]"
                 : "text-[#8A92A6]"
             }  
             `}
          >
            Students <span className="hidden md:inline">list</span>
            {/* <sup className="hidden sm:inline bg-[#F16A1B] ml-1 px-2 pb-[3px] text-[16px] text-white rounded-full ">
              55
            </sup> */}
          </button>
          <span className="font-bold">|</span>
          <button
            onClick={() => setShowTable("admission")}
            className={`font-medium
            font-nunito
             ${
               showTable === "admission"
                 ? "text-[#232D42] border-b-2 border-[#3A57E8]"
                 : "text-[#8A92A6]"
             }  
             `}
          >
            Admission <span className="hidden md:inline">Request</span>
            {/* <sup className="hidden sm:inline bg-[#F16A1B] ml-1 px-2 pb-[3px] text-[16px] text-white rounded-full ">
              55
            </sup> */}
          </button>
          {roles.includes("admin") && (
            <>
              <span className="font-bold">|</span>
              <button
                onClick={() => setShowTable("mentoring")}
                className={` font-medium
                font-nunito
             ${
               showTable === "mentoring"
                 ? "text-[#232D42] border-b-2 border-[#3A57E8]"
                 : "text-[#8A92A6]"
             }  
             `}
              >
                Mentoring
              </button>
              <span className="font-bold">|</span>

              <button
                onClick={() => setShowTable("optimization")}
                className={` font-medium
                font-nunito
             ${
               showTable === "optimization"
                 ? "text-[#232D42] border-b-2 border-[#3A57E8]"
                 : "text-[#8A92A6]"
             }  
             `}
              >
                <span className="hidden md:inline">Profile</span> Optimization
              </button>
            </>
          )}
        </div>
        {/* table controller  */}
        <TableController />
        {/* table  */}
        <div>{render}</div>
      </div>
    </>
  );
}

export default Students;
