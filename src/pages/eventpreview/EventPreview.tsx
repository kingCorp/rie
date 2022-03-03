import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonAction, Loader } from '../../components/shared/Common';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { getEvent } from '../../redux/actions/events';
import back from '../../assets/img/back.svg';
import moment from 'moment';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const { event } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [eventData, setEventData] = useState({} as EventProps);

  useEffect(() => {
    setEventData(event as EventProps);
  }, [event]);

  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getEvent(id as string))) as unknown;
    };
    anony()
      .then((ress) => {
        console.log(ress);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-black bg-opacity-80">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className=" w-max flex items-center cursor-pointer text-white  hover:text-red-600 ease-out duration-300 p-4"
        >
          <img className="w-10  ml-6 inline" src={back} /> <span className="font-bold">Back</span>
        </div>

        <div className="flex justify-center py-60   font-rubik">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col md:flex-row w-3/4 justify-center bg-white rounded-xl overflow-hidden">
              <div>
                <img src={eventData.image} className="w-full h-full object-cover" />
              </div>
              <div className=" w-full border-2 border-white bg-white relative p-4">
                <h1 className="font-bold text-4xl mb-2">{eventData.title}</h1>
                <p className=" font-bold mb-2">
                  {moment(eventData.start_date).format('MMMM Do YYYY')}
                </p>
                <p className=" font-bold mb-2">
                  {moment(moment(eventData.start_time, [moment.ISO_8601, 'HH:mm'])).format('LT')}
                </p>
                <p className=" font-bold mb-2">{eventData.venue}</p>
                <p>{eventData.description}</p>
                <div className="bottom-5 right-5  md:absolute justify-center mt-16">
                  <div className="m-auto md:flex md:flex-col  w-max text-center">
                    <p className="font-bold text-3xl">N15,000</p>
                    <ButtonAction name="Buy Ticket" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventPreview;
