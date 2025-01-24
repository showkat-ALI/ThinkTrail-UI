import React from "react";
import LiveLeftHeader from "../../partials/LiveLeftHeader";
import LiveLeftScreen from "../../partials/LiveLeftScreen";
import LiveLeftVideoOptions from "../../partials/LiveLeftVideoOptions";
import LiveSharingOption from "./../../partials/live-sharing-option";

const LiveClassLeft = () => {
  return (
    <div>
      <LiveLeftHeader />
      <div className="flex items-center justify-center">
        <LiveSharingOption />
      </div>
      <LiveLeftScreen />
      <LiveLeftVideoOptions />
    </div>
  );
};

export default LiveClassLeft;
