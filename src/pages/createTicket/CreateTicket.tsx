import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { createTicket } from '../../redux/actions/events';
import { toast, ToastContainer } from 'react-toastify';

type PayLoad = {
  status: boolean;
  message: string;
};

const CreateTicket = () => {
  const { showId } = useParams();
  const dispatch = useAppThunkDispatch();
  const { isLoading } = useAppSelector((state) => state.loader);
  const [ticketData, setTicketData] = useState({
    title: '',
    price: 0,
    capacity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ticketDetails = {
      show_id: showId,
      tickets: [ticketData],
    };
    console.log(ticketDetails);
    await dispatch(createTicket(ticketDetails))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          console.log('success', payload);
          toast.success(payload.message);
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <MainLayout>
      <ToastContainer />
      <div className="text-center py-4 bg-gray-50 ">
        <h2 className="font-bold font-rubik text-2xl">Create Ticket</h2>
      </div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <form onSubmit={handleSubmit}>
            <InputField
              name="title"
              label="Title"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="price"
              label="Price"
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeNumber(e)}
            />
            <InputField
              name="capacity"
              label="Ticket Limit"
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeNumber(e)}
            />
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              {isLoading ? (
                <ButtonAction name="Add Ticket" type="submit" disabled loading />
              ) : (
                <ButtonAction name="Add Ticket" type="submit" />
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTicket;
