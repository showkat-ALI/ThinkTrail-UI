import React, { useState } from "react";
import style from "../../../../../styles/GeneralStyles.module.css";
import { TbChevronRight } from "react-icons/tb";
import { useGetAllLessonCourseQuery } from "../../../../../feature/api/dashboardApi";
import { useAppSelector } from "../../../../../app/hooks";
import { useAppDispatch } from "../../../../../app/hooks";
import { playVideo } from "../../../../../feature/course/moduleVideoplay";
import imgJPG from "../../../../../assets/01.jpg";

export default function AllLessons({
  enrollmentData,
}: {
  enrollmentData: any;
}) {
  const { isError, data, error, isLoading, isSuccess } =
    useGetAllLessonCourseQuery(enrollmentData.course.id);
  const [click, setClick] = useState("");

  const dispatch = useAppDispatch();
  const clickVideo = (youtubeVideo:string,localVideo: string, topicName: any, _id: string) => {
    setClick(_id);
    //console.log(localVideo);
    if(youtubeVideo.length > 5) {
          dispatch(playVideo({ localVideo:youtubeVideo }));
    }else{
      dispatch(playVideo({ localVideo:localVideo }));
    }
  };
  //console.log(data);
  return (
    <div className="bg-white rounded-xl py-4 px-3 flex flex-col mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-title-clr mb-3 font-bold">All Lessons:</h1>
        <TbChevronRight className="text-xl" />
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : isSuccess && data.data.videos ? (
          data.data.videos.map(
            (
              {
                topicName,
                youtubeVideo,
                minutes,
                localVideo,
                _id,
              }: {
                topicName: string;
                youtubeVideo: string;
                minutes: number;
                localVideo: string;
                _id: string;
              },
              i:number
            ) => (
              <div
                onClick={() => clickVideo(youtubeVideo,localVideo, topicName, _id)}
                key={_id}
                className="flex flex-col items-center py-3 px-1 bg-transparent  md:flex-row md:max-w-xl hover:bg-gray-100 lg:max-w-xl cursor-pointer "
              >
                <div>
                  <p className="text-small-text-color font-bold text-xl">
                    {i + 1}
                  </p>
                </div>
                <div
                  className={`md:min-w-[8rem] lg:min-w-[13rem] flex justify-end items-end p-2  mx-3 h-24 rounded-xl ${style.CompletedLesBg}`}
                >
                  <div className="w-20 p-1 text-white flex justify-center items-center text-xs h-6 rounded-lg bg-indigo-900">
                    00 : {minutes} : 00
                  </div>
                </div>

                <p
                  className={` ${
                    click === _id ? "text-[#3a59e2]" : ""
                  } text-small-text-color text-sm  `}
                >
                  {topicName}
                </p>
              </div>
            )
          )
        ) : (
          <div>not found</div>
        )}
      </div>
    </div>
  );
}
