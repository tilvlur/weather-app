import useInput from "./useInput";
import { useAppDispatch } from "../../common/hooks/hooks";
import { setUserSelectedLocation } from "./geocodingSlice";
import type { GeocodingDALobj } from "./api/types";
import { fetchWeatherData } from "../weather/weatherSlice";

function AutocompleteInput() {
  const { value, onChange, clearInput, clearSuggestions, suggestions } =
    useInput("");
  const dispatch = useAppDispatch();

  const onChooseSuggestionHandle = (place: GeocodingDALobj) => {
    dispatch(setUserSelectedLocation(place));
    dispatch(fetchWeatherData());
    clearInput();
    clearSuggestions();
  };

  // TODO добавить кнопку очистки инпута
  return (
    <div>
      <input
        role="searchbox"
        placeholder="Find city..."
        value={value}
        onChange={onChange}
        type="text"
      />
      <div style={{ position: "absolute", top: 100, height: 500 }}>
        {suggestions.map((s, i) => (
          <div
            key={s.id}
            role="searchbox"
            tabIndex={i}
            onClick={() => onChooseSuggestionHandle(s)}
            onKeyDown={() => onChooseSuggestionHandle(s)}
          >
            <div>{s.placeName}</div>
            <div>lat: {s.lat}</div>
            <div>lon: {s.lon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutocompleteInput;
