import { memo } from "react";
import MainInfo from "../../../common/components/MainInfo";

function Today() {
  return (
    <>
      <MainInfo />
      <div>TODAY</div>
    </>
  );
}

export default memo(Today);
