/* eslint-disable */
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { useAppSelector } from '../../redux/store';
import Api from '../../services/apis';
import { toast, ToastContainer } from 'react-toastify';


const ScanTicket = (props) => {
  const { event } = useAppSelector((state) => state.events);
  const [data, setData] = useState('No result');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);

  const searchTicket = async (code) => {
    const data = {
      code: code,
      show_id: event._id,
    };
    try {
      setLoading(true);
      const res = await Api.events.searchTicket(data);
      console.log(res.data);
      setResult(res.data.data);
      setLoading(false);
      setProcess(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.message);
      toast(error?.response?.data?.message);
      setProcess(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {process && (
        <QrReader
          facingMode="rear"
          delay={500}
          onResult={(result, error) => {
            if (result) {
              // eslint-disable-next-line
              // setData(result?.text);
              searchTicket(result?.text);
            }

            if (error) {
              console.info(error);
            }
          }}
          style={{ width: '200px', heigth: '100px' }}
          scanDelay={500}
        />
      )}
      <ButtonAction name="scan" type="button" onClick={() => setProcess(true)} />
      <p>{data}</p>

      <div>
        <InputField
          name="search"
          placeholder="Search tickets"
          onChange={() => setData(e.target.value)}
        />
        <ButtonAction name="search" type="button" onClick={() => searchTicket(data)} />
      </div>
    </div>
  );
};

export default ScanTicket;
