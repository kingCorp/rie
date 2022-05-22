/* eslint-disable */
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { ButtonAction, InputField } from '../../components/shared/Common';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import Api from '../../services/apis';
import { toast, ToastContainer } from 'react-toastify';
import { checkTicketIn } from '../../redux/actions/events';
import { TailSpin } from 'react-loader-spinner';

const ScanTicket = (props) => {
  const { event } = useAppSelector((state) => state.events);
  const [data, setData] = useState('No result');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const dispatch = useAppThunkDispatch();
  const { isLoading } = useAppSelector((state) => state.loader);

  const searchTicket = async () => {
    const data = {
      code: code.toLowerCase(),
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

  const handleCheck = async (checked_in, ticket_id, code) => {
    await dispatch(checkTicketIn({ data: { ticket_id, code }, showID: id }))
      .then((res) => {
        const payload = res.payload;
        if (payload.status) {
          return toast.success(payload.message);
        } else {
          return toast.warn(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
              setCode(result?.text);
              searchTicket();
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
          onChange={(e) => setCode(e.target.value)}
        />
        <ButtonAction name="search" type="button" onClick={() => searchTicket(data)} />
      </div>

      {result && (
        <div>
          <div>
            <p>Type: {result.ticket?.title}</p>
            <p>Code: {result.code.toUpperCase()}</p>
            <p>Price: {result.ticket?.price}</p>
            <p>Quantity: {result.ticket?.purchased}</p>
            <p>Total amount: {result.ticket?.total_amount_purchased}</p>
          </div>
          {!result.is_checked_in ? (
            <button
              type="button"
              className="w-40 py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700 flex justify-center"
              onClick={() => {
                handleCheck(result.is_checked_in, result.ticket._id, result.code);
              }}
            >
              {isLoading && currentCode === code.code ? (
                <TailSpin color="white" height={20} width={20} />
              ) : (
                'Check In'
              )}
            </button>
          ) : (
            <p className="text-green-700">Already Checked in</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanTicket;
