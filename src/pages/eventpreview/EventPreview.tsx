import React from 'react';
import { useParams } from 'react-router-dom';
import oge from '../../assets/img/oge.png';
import { ButtonAction } from '../../components/shared/Common';
const EventPreview = () => {
  const { id } = useParams();
  return (
    <div className="flex justify-center py-60 bg-black h-screen">
      <div className="flex w-2/3 justify-center bg-white rounded-xl">
        <div>
          <img src={oge} className="w-full h-full object-cover rounded-l-xl" />
        </div>
        <div className=" w-full border-2 border-white bg-white rounded-xl relative p-4">
          <h1>Talk with Oge</h1>
          <p>Wed, 19 Nov, 2021</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ullam ut debitis qui,
            saepe ipsa molestias blanditiis perferendis quibusdam incidunt dignissimos harum placeat
            nesciunt sit numquam ea quos cumque doloribus.
          </p>
          <div className="flex justify-end bottom-10">
            <div className="flex flex-col w-max">
              <p>N15,000</p>
              <ButtonAction name="Buy Ticket" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
