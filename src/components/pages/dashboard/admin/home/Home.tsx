import OverView from "../overview/OverView";
import CompletedLesson from "./CompletedLesson";
import GroupDiscussion from "./GroupDiscussion";
import NextClass from "./NextClass";
import NoticeBoard from "./NoticeBoard";
import StudyStatistics from "./StudyStatistics";

function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 font-nunito bg-gray-bg">
      <div className="col-span-12 lg:col-span-8">
        <OverView />
        <StudyStatistics />

        <NextClass />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            <CompletedLesson />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            <NoticeBoard />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-12">
            <GroupDiscussion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
