import React from "react";
import AllLessons from "./all-lessons";
import Singlelesson from "./single-lesson";
import {useRouter} from "next/router";
import {useGetEnrollmentQuery, useGetMyCourseDetailsQuery} from "../../../../../feature/api/dashboardApi";


export default function Courselayout() {
  const router = useRouter();
  const id = router?.query?.id as any;
  const { isError,data, error, isLoading, isSuccess } =  useGetMyCourseDetailsQuery(id)
  console.log(data)
  return (
    <div className="grid grid-cols-12 gap-4 font-nunito bg-gray-bg">
      <div className="col-span-12 lg:col-span-8">
       {
       isLoading ?
           <div>Loading...</div> 
           : isError ?
              <div>Error...</div>
                 : isSuccess && data?.data?
                   <>          
                      <Singlelesson enrollmentData={data?.data}/>
                   </>: 
                     <div>Not found</div>
         }
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            {
             isLoading ?
                <div>Loading...</div> 
                 : isError ?
                   <div>Error...</div>
                     : isSuccess && data?.data ?
                        <>          
                         <AllLessons enrollmentData={data?.data}/>
                        </>: 
                               <div>Not found</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
