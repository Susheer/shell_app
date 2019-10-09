import React from "react";
import rendered from "../coundown";
import Countdown from "react-countdown-now";
const Timer = ({ time }) => {
  return (
    <div>
      <Countdown date={new Date(time)} renderer={rendered} />{" "}
    </div>
  );
};
export default Timer;
