import React, { useState } from "react";
import styles from "../../../styles/GeneralStyles.module.css";
import AnnouncementModal from "../../common/announcement/AnnounceModal";

import Mike from "../../../Icon/Mike";
export default function Announce() {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <div className={`${styles.dashboardTopBg} w-full h-[10rem] font-nunito`}>
        <div className="container flex xsm:flex-col sm:flex-row lg:flex-row md:flex-row xl:flex-row justify-between xsm:px-[5px] sm:px-10 md:px-10 lg:px-10 xl:px-10  xsm:py-[5px] sm:py-5 md:py-5 lg:py-5 xl:py-5">
          <div>
            <h1 className="text-4xl font-extrabold text-white">Welcome!</h1>
            <p className="text-white text-sm">
              The Fourth IT Academy Courses Dashboard has everything you need to
              succeed
            </p>
          </div>
          <div>
            <button
              onClick={() => setShow(true)}
              className="p-4 flex justify-between items-center text-white bg-blue-700 xsm:mt-[5px] sm:mt-0 lg:mt-0 md:mt-0 xl:mt-0"
            >
              Announcements
              <div>
                <Mike />
              </div>
            </button>
          </div>
        </div>
      </div>
      {show && <AnnouncementModal show={show} handleClose={handleClose} />}
    </>
  );
}
