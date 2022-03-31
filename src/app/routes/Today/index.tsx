import { memo } from "react";
import MainInfo from "../../../common/components/MainInfo";
import TodayDetails from "./TodayDetails";

function Today() {
  return (
    <>
      <MainInfo />
      <TodayDetails />
    </>
  );
}

export default memo(Today);
