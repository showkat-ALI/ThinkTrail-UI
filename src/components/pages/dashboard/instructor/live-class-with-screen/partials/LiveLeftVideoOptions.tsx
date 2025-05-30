import React,{useState} from "react";
import StartClass from "./modal/StartClass";
import JoinClass from "./modal/JoinClass";
import { IoVideocam } from "react-icons/io5";
import { RiAddBoxFill } from "react-icons/ri";
import { useAppSelector } from "../../../../../../redux-hook/hooks";

const LiveLeftVideoOptions = () => {
  const [moduleModalShow, setmoduleModalShow] = useState<boolean>(false);
  const [joinclass, setjoinclass] = useState(false)
  const { user:{id:userid,title,roles}  } = useAppSelector((state) => state.auth);
  
  const handleClick = () => {
    setmoduleModalShow(true)
  }
  return (
    <div className="pt-[100px] pb-[100px] lg:pb-[150px] flex justify-center space-x-5">
      <StartClass show={moduleModalShow} setShowModal={setmoduleModalShow}/>
      <JoinClass show={joinclass} setShowModal={setjoinclass}/>
      <button disabled={roles.includes("student")} className="text-center" onClick={handleClick}>
        <div className="bg-orange-400  px-4 py-3  rounded-lg shadow-xl flex items-center mb-2 cursor-pointer">
          <IoVideocam className="w-[35px] h-[30px]  text-white" />
        </div>
        <p className="text-[#5F5F60] font-medium font-nunito">Start Class</p>
      </button>
      <div className="text-center" onClick={() => setjoinclass(true)}>
        <div className="bg-blue-700 px-4 py-3 rounded-lg shadow-xl flex items-center mb-2 cursor-pointer">
          <RiAddBoxFill className="w-[35px] h-[30px]  text-white" />
        </div>
        <p className="text-[#5F5F60] font-medium font-nunito">Join Class</p>
      </div>
    </div>
  );
};

export default LiveLeftVideoOptions;
