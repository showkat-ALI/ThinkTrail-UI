"use client"
import React from "react";
import AllLessons from "./all-lessons";
import SingleLesson from "./single-lesson";
import {useSearchParams} from "next/navigation";
import {useGetMyCourseDetailsQuery} from "../../../../../feature/api/dashboardApi";


export default function CourseLayout(id:any) {
  
  const { isError, data, isLoading, isSuccess } = useGetMyCourseDetailsQuery(id?.id?.id);
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
                      <SingleLesson enrollmentData={data?.data}/>
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
