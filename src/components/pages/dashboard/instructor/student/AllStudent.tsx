import responsiveStyle from "../../../../../styles/ContactStyle.module.css";
import Image from "next/image";
import ellicps from "../../../../../assets/Ellipse 782.png";
import {useGetAllEnrollmentInstructorQuery} from "../../../../../feature/api/dashboardApi";
import { useAppSelector } from "../../../../../app/hooks";
import {Spinner} from "flowbite-react";
import Link from "next/link";



const AllStudent = () => {
    const {id} =
    useAppSelector((state) => state.auth.user);
    const { data, isSuccess, isError, isLoading } = useGetAllEnrollmentInstructorQuery(id);

    //console.log(data?.data?.enrollments?.student)
   
  return (
    <>
    <div className="w-full md:overflow-scroll xl:overflow-hidden lg:overflow-hidden xsm:overflow-scroll sm:overflow-x-visible h-[100vh]">
      <div
        className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full `}
      >
        <table className={`w-full text-[16px] md:text-[18px] text-left`}>
          <thead className="text-small-text-color text-sm ">
            <tr>
              <th scope="col" className=" font-normal py-3">
                Student Name
              </th>
            </tr>
          </thead>
          <tbody className="text-[#232D42]">
            {   
              isLoading ? <div className="flex justify-center items-center"><Spinner /></div> : isError ? <div>Error...</div> : isSuccess &&
              data?.data?.enrollments?.length > 0 ?
                data?.data?.enrollments?.map((val:any) => (
                 <tr className={`border-b ${val.id % 2 == 1 ? "bg-white" : ""}`}>
                     <Link href={`/dashboard/student/grade/[id]`} as={`/dashboard/student/grade/${val?.student?._id}`}>
                        <td scope="row" className="py-6 px-6 text-center flex  items-center cursor-pointer">
                          <Image
                            width={30}
                            height={30}
                            className=" rounded-full"
                            src={ellicps}
                            alt="Rounded avatar"
                          />
                          <p className="ml-5 text-sm font-bold">{`${val?.student?.firstName} ${val?.student?.lastName}`}</p>
                       </td>
                    </Link> 
                  </tr>
                )) :
                      <div>No grade found</div>
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default AllStudent