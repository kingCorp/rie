import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function SearchLocationInput() {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Enter a City"
        value={query}
      />
    </div>
  );
}

const GOOGLEAPIS = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
const APIKEY = '';

export const autocompletePlaces = async (input: string) => {
  // let requestUrl = GOOGLEAPIS + 'input=' + input + '&key=' + APIKEY + '&components=' + REGION;
  let requestUrl = GOOGLEAPIS + '&key=' + APIKEY + '&input=' + input;
  console.log(requestUrl);
  try {
    const result = await axios({
      method: 'get',
      url: requestUrl,
      timeout: 60 * 2 * 1000,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
