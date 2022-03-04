import React, { useState } from 'react';
import Api from '../../../services/apis';
import { GOOOGLE_AUTOCOMPLETE_API_KEY } from '../../../utils/constants';

// interface PlacesResponse {
//   predictions: [];
//   status: string;
// }
export default function SearchLocationInput() {
  const [address, setAddress] = useState('');

  const autocompletePlaces = async (input: string) => {
    try {
      const result = await Api.places.searchPlaces(GOOOGLE_AUTOCOMPLETE_API_KEY as string, input);
      const data = result.json();
      return console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    await autocompletePlaces(e.target.value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          handleChange(e)
            .then(() => {})
            .catch(() => {});
        }}
      />
    </div>
  );
}
