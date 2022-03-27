import { ChangeEvent, useState } from "react";
import { fetchPlaces } from "./api";
import { GeocodingDALout } from "./api/types";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<GeocodingDALout>([]);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const response = await fetchPlaces.forward(event.target.value);
    if (response) setSuggestions(response);
  };

  const clearInput = () => {
    setValue("");
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return {
    value,
    onChange: handleChange,
    suggestions,
    clearInput,
    clearSuggestions,
  };
};

export default useInput;
