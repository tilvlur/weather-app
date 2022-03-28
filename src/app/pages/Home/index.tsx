import { memo } from "react";
import MainInfo from "../../../common/components/MainInfo";

function Home() {
  return (
    <>
      <MainInfo />
      <div>HomePage</div>
    </>
  );
}

export default memo(Home);