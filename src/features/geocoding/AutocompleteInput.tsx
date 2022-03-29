import useInput from "./useInput";
import { useAppDispatch } from "../../common/hooks/hooks";
import { setUserSelectedLocation } from "./geocodingSlice";
import type { GeocodingDALobj } from "./api/types";
import { fetchWeatherData } from "../weather/weatherSlice";
import styles from "./AutocompleteInput.module.scss";

function AutocompleteInput() {
  const { value, onChange, clearInput, clearSuggestions, suggestions } =
    useInput("");
  const dispatch = useAppDispatch();

  const isSuggestions = suggestions.length > 0;

  const onChooseSuggestionHandle = (place: GeocodingDALobj) => {
    dispatch(setUserSelectedLocation(place));
    dispatch(fetchWeatherData());
    clearInput();
    clearSuggestions();
  };

  const onClearBtnClickHandle = () => {
    clearInput();
    clearSuggestions();
  };

  const renderSuggestions = isSuggestions ? (
    <div className={styles.suggestions}>
      {suggestions.map((s, i) => (
        <div
          key={s.id}
          className={styles.suggestionItem}
          role="searchbox"
          tabIndex={i}
          onClick={() => onChooseSuggestionHandle(s)}
          onKeyDown={() => onChooseSuggestionHandle(s)}
        >
          {s.placeName}
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.searchBoxContainer}>
        <input
          className={styles.searchBox}
          role="searchbox"
          placeholder="Find city..."
          value={value}
          onChange={onChange}
          type="text"
        />
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClearBtnClickHandle}
          disabled={!value}
        >
          ╳
        </button>
      </div>
      {renderSuggestions}
    </div>
  );
}

export default AutocompleteInput;
