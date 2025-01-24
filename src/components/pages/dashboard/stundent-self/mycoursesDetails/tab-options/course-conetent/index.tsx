import { Accordion } from "flowbite-react";
import React, { useState } from "react";
import AccordionOptions from "../../../../../../common/accordion/accordion-general";
import { useAppDispatch } from "../../../../../../../app/hooks";
import { playVideo } from "../../../../../../../feature/course/moduleVideoplay";
import Link from "next/link";
import { useGetAllSubmitAssignmentQuery } from "../../../../../../../feature/api/dashboardApi";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../../../../app/hooks";
import moment from "moment";
import play from "../../../../../../../assets/lessonplay.png";
import Image from "next/image";

export default function index({ enrollmentData }: { enrollmentData: any }) {
  const { data, isSuccess, isError, isLoading } =
    useGetAllSubmitAssignmentQuery({});
  const [click, setClick] = useState("");
  const { id: studentId,studentType } = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const clickVideo = (youtubeVideo:string,localVideo: string, topicName: any, _id: any) => {
    setClick(_id);
    if(youtubeVideo.length > 3 ){
      dispatch(playVideo({ localVideo:youtubeVideo }));
    }else{
      dispatch(playVideo({ localVideo:localVideo }));
    }
  };

 
  //onClick={() => assignmentSubmitHandle(id)}
 // console.log(moment("2021-07-14T00:00:00.000Z").utc().format("YYYY-MM-DD"));
  const openSlide = (fileUrl:string) => {
    window.open(`https://docs.google.com/gview?url=${fileUrl}`)
    
  }
  return (
    <Accordion alwaysOpen={true} className="border-none p-0">
      {enrollmentData.course.modules.map(
        (
          {
            name,
            assignments,
            quizzes,
            slides,
            videos,
            numberOfVideos,
            pages,
            duration,
            _id
          }: {
            name: string;
            _id:any;
            assignments: any;
            pages:any;
            quizzes: any;
            slides: any;
            videos: any;
            numberOfVideos: number;
            duration: number;
          },
          index: number
        ) => (
          <Accordion.Panel key={_id} className="p-0">
            <Accordion.Title className="py-10 px-3 bg-none border-0 border-none ">
              <p className="text-lg font-bold ">{name}</p>
              <p className="text-sm text-small-text-color">
                {numberOfVideos} videos | {duration} minutes
              </p>
            </Accordion.Title>
            <Accordion.Content className="bg-white">
            {
             !studentType.includes("self-pace") && ( assignments &&
                assignments.map(
                  ({
                    name,
                    id,
                    score,
                  }: {
                    name: string;
                    id: string;
                    score: number;
                  }) => (
                    //   <Link href={"/dashboard/student-instructor-led/assignment-submission/[courseId]/[assignmentId]"} as={`/dashboard/student-instructor-led/assignment-submission/${enrollmentData.course.id}/${id}`}>
                    <div className="flex my-5" key={id}>
                      <div className="flex items-center h-5 cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          checked={true}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-2 text-sm cursor-pointer">
                       <Link href={"/dashboard/assignment/[courseId]/[id]"} as={`/dashboard/assignment/${enrollmentData.course._id}/${id}`}> 
                         <a target="_blank">
                             <label
                               className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                             >
                               Assignment - {name}
                             </label>
                         </a>
                       </Link>
                        <p
                          id="helper-checkbox-text"
                          className="text-xs font-normal text-gray-500 dark:text-gray-300"
                        >
                          {score} pts . Submit
                        </p>
                      </div>
                    </div>
                    // </Link>
                  )
                )
                  ) }
              {
                !studentType.includes("self-pace") && (quizzes &&
                quizzes.map(
                  ({
                    title,
                    id,
                    startDate,
                  }: {
                    title: string;
                    id: string;
                    startDate: string;
                  }) => (
                    <Link
                      href={
                        "/dashboard/quiz/[courseId]/[quiz]"
                      }
                      as={`/dashboard/quiz/${enrollmentData.course.id}/${id}`}
                      key={id}
                    >
                      <a target="_blank">
                         <div className="flex my-5 cursor-pointer">
                           <div className="flex items-center h-5">
                             <input
                               id="helper-checkbox"
                               aria-describedby="helper-checkbox-text"
                               type="checkbox"
                               value=""
                               checked
                               className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                             />
                           </div>
                           <div className="ml-2 text-sm">
                             <label
                               htmlFor="helper-checkbox"
                               className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                             >
                               Quiz - {title}
                             </label>
                             <p className="text-xs font-normal text-gray-500 dark:text-gray-300">
                               {moment(startDate).utc().format("MMMM")}
                             </p>
                           </div>
                         </div>
                      </a>
                    </Link>
                  )
                )
               )}

              {slides &&
                slides.map(({ title,fileUrl,_id }: { title: string;fileUrl:string;_id:string }) => (
                  <div className="flex my-5 " key={_id}>
                    <div className="flex items-center h-5">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value=""
                        checked
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <label
                        
                        className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                        onClick={() =>openSlide(fileUrl)}
                      >
                        File - {title}
                      </label>
                      <p className="text-xs font-normal text-gray-500 dark:text-gray-300 flex items-center gap-2">
                            View . 01 File    
                      </p>
                    </div>
                  </div>
                ))}

                {pages &&
                pages.map(({ title,description,_id }: { title: string;description:string,_id:string }) => (
                  <div className="flex my-5 " key={_id}>
                    <div className="flex items-center h-5">
                      <input
                        id="helper-checkbox"
                        aria-describedby="helper-checkbox-text"
                        type="checkbox"
                        value=""
                        checked
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      <Link 
                         href={
                          "/dashboard/page-overview/[id]"
                        }
                        as={`/dashboard/page-overview/${_id}`}
                        key={_id}
                      >
                        <a target="_blank">
                          <label
                            className="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                          >
                            Pages - {title}
                          </label>
                        </a>  
                      </Link>
                    </div>
                  </div>
                ))}
              {videos &&
                videos.map(
                  ({
                    topicName,
                    youtubeVideo,
                    minutes,
                    _id,
                    localVideo
                  }: {
                    topicName: string;
                    youtubeVideo: string;
                    minutes: number;
                    _id: any;
                    localVideo:string;
                  }) => (
                    <div
                      key={_id}
                      className={`flex my-5 cursor-pointer ${
                        click === _id ? "text-[#3a59e2]" : ""
                      }`}
                      onClick={() => clickVideo(youtubeVideo,localVideo, topicName,_id)}
                    >
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          value=""
                          checked
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div
                        className="ml-2 text-sm"
                      >
                        <label
                          className={` cursor-pointer font-medium text-gray-900 dark:text-gray-300 ${
                            click === _id ? "text-[#3a59e2]" : ""
                          }`}
                        >
                          Video lesson - {topicName}
                        </label>
                        <p className="text-xs font-normal text-gray-500 dark:text-gray-300 flex items-center gap-2">
                          <Image src={play} width={18} height={18} alt="" />{" "}
                          {minutes} mins
                        </p>
                      </div>
                    </div>
                  )
                )}
            </Accordion.Content>
          </Accordion.Panel>
        )
      )}
    </Accordion>
  );
}
