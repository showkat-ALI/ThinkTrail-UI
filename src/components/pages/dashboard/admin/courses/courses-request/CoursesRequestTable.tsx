import responsiveStyle from "../../../../../../styles/ContactStyle.module.css";
import CoursesRequestTableRow from "./CoursesRequestTableRow";
import { useGetAllCourseRequestQuery } from '../../../../../../feature/api/dashboardApi';


const CoursesRequestTable = () => {
    const { data, isSuccess, isError, isLoading } = useGetAllCourseRequestQuery({});

    return (
        <>
            {
                isLoading ?
                    <div>Loading...</div>
                    : isError ?
                        <div>Error...</div>
                        : isSuccess && data?.data?.courses && data.data.courses.length > 0 ?
                            <div
                                className={` ${responsiveStyle.responsiveTable} overflow-x-scroll lg:overflow-x-auto md:w-full shadow-md sm:rounded-lg mt-12`}
                            >
                                <table className={`w-full text-[16px] md:text-[18px] text-left`}>
                                    <thead className="text-[#ADB5BD] font-normal">
                                        <tr>
                                            <th scope="col" className="py-3 px-6">
                                                Tutor
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Course title
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Date Requested
                                            </th>
                                            <th scope="col" className="py-3 px-6">
                                                Status
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#232D42]">
                                        {data.data.courses.map(({ _id, title, instructors, createdAt, isActive, isPending,status }: { status:string;_id: string, title: string, instructors: { id: string, firstName: string, lastName: string }[], createdAt: Date, isActive: boolean, isPending: boolean }) => (
                                            <CoursesRequestTableRow
                                                key={_id}
                                                id={_id}
                                                instructors={instructors}
                                                courseTitle={title}
                                                isPending={isPending}
                                                isActive={isActive}
                                                date={createdAt}
                                                status={status}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <div>No course found</div>
            }
        </>
    );
}

export default CoursesRequestTable;
