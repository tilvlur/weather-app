import { memo } from "react";
import MainInfo from "../../../common/components/MainInfo";
import TomorrowDetails from "./TomorrowDetails";

function Tomorrow() {
  return (
    <>
      <MainInfo />
      <TomorrowDetails />
    </>
  );
}

export default memo(Tomorrow);
