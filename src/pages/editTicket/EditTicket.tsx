import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { editTicket } from '../../redux/actions/events';
import { toast, ToastContainer } from 'react-toastify';

type PayLoad = {
  status: boolean;
  message: string;
};
interface LocationState {
  ticket: {
    title: string;
    price: number;
    capacity: number;
  };
}

const EditTicket = () => {
  const location = useLocation();
  const { ticket } = (location.state as LocationState) || { ticket: {} };
  const { id } = useParams();
  const dispatch = useAppThunkDispatch();
  const { isLoading } = useAppSelector((state) => state.loader);
  const [ticketData, setTicketData] = useState({
    title: ticket.title,
    price: ticket.price,
    capacity: ticket.capacity,
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
    await dispatch(editTicket({ id: id as string, data: ticketData }))
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
        <h2 className="font-bold font-rubik text-2xl">Edit Ticket</h2>
      </div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <form onSubmit={handleSubmit}>
            <InputField
              name="title"
              label="Title"
              type="text"
              value={ticketData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="price"
              label="Price"
              type="number"
              value={ticketData.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeNumber(e)}
            />
            <InputField
              name="capacity"
              label="Ticket Limit"
              type="number"
              value={ticketData.capacity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeNumber(e)}
            />
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              {isLoading ? (
                <ButtonAction name="Save Changes" type="submit" disabled loading />
              ) : (
                <ButtonAction name="Save Changes" type="submit" />
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditTicket;
