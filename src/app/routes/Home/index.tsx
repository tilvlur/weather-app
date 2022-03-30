import { memo } from "react";
import RequestLC from "../../../common/components/RequestLC";
import { useAppSelector } from "../../../common/hooks/hooks";
import { selectWeather } from "../../../features/weather/weatherSlice";
import MainInfo from "../../../common/components/MainInfo";
import SavedPlaces from "./SavedPlaces";

function Home() {
  const { cityLink } = useAppSelector(selectWeather);

  return cityLink ? (
    <>
      <MainInfo />
      <SavedPlaces />
    </>
  ) : (
    <RequestLC variant="autoSearchFailed" />
  );
}

export default memo(Home);
