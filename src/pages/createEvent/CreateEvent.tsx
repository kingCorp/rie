import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField } from '../../components/shared/Common';
// import { paths } from '../../utils/constants';
import { createEvents } from '../../redux/actions/events';
import { useAppThunkDispatch } from '../../redux/store';

const CreateEvent = () => {
  const dispatch = useAppThunkDispatch();
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    venue: '',
    image: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    is_security_requested: false,
    is_tag_requested: false,
  });

  const handleCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: keyof typeof eventDetails,
  ) => {
    const { name } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: !eventDetails[val],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: 'high',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventDetails);
    await dispatch(createEvents(eventDetails))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <form onSubmit={handleSubmit}>
            <InputField
              name="title"
              label="Event Title"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="description"
              label="Description"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="venue"
              label="Venue"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_date"
              label="Start Date"
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_date"
              label="End Date"
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="start_time"
              label="Start Time"
              type="time"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="end_time"
              label="End Time"
              type="time"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="is_security_requested"
              label="Is Security Requested"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckBox(e, 'is_security_requested')
              }
            />
            <InputField
              name="is_tag_requested"
              label="Is Tag Requested"
              type="checkbox"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCheckBox(e, 'is_tag_requested')
              }
            />

            <InputField
              name="image"
              label="Event Art"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleImage(e)}
            />

            <input type="" />
            <div className="mt-6 text-center"></div>

            <ButtonAction type="submit" name="Register Event" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
