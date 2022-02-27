import React from 'react';
import { useParams } from 'react-router-dom';
import oge from '../../assets/img/oge.png';
import { ButtonAction } from '../../components/shared/Common';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/store';
interface EventProps {
  commission_percentage: number;
  created_at: string;
  description: string;
  end_date: string;
  end_time: string;
  image: string;
  is_cashed_out: boolean;
  is_closed: boolean;
  is_security_requested: boolean;
  is_tag_requested: boolean;
  number_of_tickets_sold: number;
  organizer: string;
  start_date: string;
  start_time: string;
  tickets: [];
  title: string;
  total_amount_sold: number;
  updated_at: string;
  venue: string;
}
const EventPreview = () => {
  const { id } = useParams();
  const { events } = useAppSelector((state) => state.events);
  const [eventData, setEventData] = useState(events[Number(id)] as EventProps);

  useEffect(() => {
    setEventData(events[Number(id)] as EventProps);
  }, [events]);
  return (
    <div className="flex justify-center py-60 bg-black bg-opacity-80 font-rubik">
      <div className="flex flex-col md:flex-row w-3/4 justify-center bg-white rounded-xl overflow-hidden">
        <div>
          <img src={eventData.image} className="w-full h-full object-cover" />
        </div>
        <div className=" w-full border-2 border-white bg-white relative p-4">
          <h1 className="font-bold text-4xl mb-2">{eventData.title}</h1>
          <p className=" font-bold mb-2">{eventData.start_date}</p>
          <p>{eventData.description}</p>
          <div className="bottom-5 right-5  md:absolute justify-center mt-16">
            <div className="m-auto md:flex md:flex-col  w-max text-center">
              <p className="font-bold text-3xl">N15,000</p>
              <ButtonAction name="Buy Ticket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
