import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import { useAppSelector } from '../../redux/store';
import { useState, useEffect } from 'react';

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
const EventDetails = () => {
  const { id } = useParams();
  const { events } = useAppSelector((state) => state.events);
  const [eventData, setEventData] = useState(events[Number(id)] as EventProps);

  useEffect(() => {
    setEventData(events[Number(id)] as EventProps);
  }, [events]);

  return (
    <div>
      <MainLayout>
        <p> EventDetails page</p>
      </MainLayout>
    </div>
  );
};

export default EventDetails;
