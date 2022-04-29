import React, { useState } from 'react';
import Api from '../../../services/apis';
import { GOOOGLE_AUTOCOMPLETE_API_KEY } from '../../../utils/constants';
import cancel from '../../../assets/img/canceledit.svg';
import { MidLoader } from '.';

interface Prediction {
  description: string;
}

interface PlacesResponse {
  predictions: Array<Prediction>;
  status: string;
}

interface Props {
  setVenue: React.Dispatch<React.SetStateAction<string>>;
  venue: string;
  label: string;
  name: string;
}

export default function SearchLocationInput({ setVenue, venue, label, name }: Props) {
  const [placesLoading, setPlacesLoading] = useState(false);
  const [places, setPlaces] = useState([] as Array<Prediction>);
  const [open, setOpen] = useState(false);

  const autocompletePlaces = async (input: string) => {
    try {
      setPlacesLoading(true);
      const result = await Api.places.searchPlaces(GOOOGLE_AUTOCOMPLETE_API_KEY as string, input);
      const data = result.data as PlacesResponse;
      setPlacesLoading(false);
      setPlaces(data.predictions);
      console.log(data);
    } catch (error) {
      setPlacesLoading(false);
      console.log(error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setVenue(e.target.value);
    setOpen(true);
    await autocompletePlaces(e.target.value)
      .then((res) => {})
      .catch((err) => {});
  };

  const handleSelect = (location: string) => {
    setOpen(false);
    setVenue(location);
  };

  return (
    <div className="relative mb-4">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        value={venue}
        name={name}
        className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block w-full"
        onChange={(e) => {
          handleChange(e)
            .then(() => {})
            .catch(() => {});
        }}
      />
      <div
        className={`absolute bg-white z-10 w-full rounded shadow pt-7 py-3 max-h-[30vh] overflow-scroll top-[110%] ${
          open ? '' : 'hidden'
        }`}
      >
        <img
          src={cancel}
          alt=""
          className="w-5 absolute top-2 right-2 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        {placesLoading ? (
          <MidLoader />
        ) : (
          places.map((place, index) => (
            <div
              key={index}
              className="cursor-pointer font-rubik p-2 hover:bg-gray-200"
              onClick={() => handleSelect(place.description)}
            >
              {place.description}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
