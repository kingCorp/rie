import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import { Loader } from '../../components/shared/Common';
import { getTickets, checkTicketIn, checkTicketOut } from '../../redux/actions/events';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

type PayLoad = {
  status: boolean;
  message: string;
};

type Ticket = {
  price: number;
  total_amount_purchased: number;
  capacity: number;
  purchased: number;
  _id: string;
  show: string;
  codes: Array<Code>;
  title: string;
  created_at: string;
  updated_at: string;
};
type Code = {
  is_checked_in: boolean;
  _id: string;
  code: string;
  ticket: string;
  user: {
    codes: [];
    _id: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    created_at: string;
    updated_at: string;
  };
  payment_ref: string;
  created_at: string;
  updated_at: string;
};

const EventSubscribers = () => {
  const { id } = useParams();
  const { tickets, ticketsLoading } = useAppSelector((state) => state.events);
  const { isLoading } = useAppSelector((state) => state.loader);
  const [subTickets, setSubTickets] = useState([] as Array<Ticket>);
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    setSubTickets(tickets);
  }, [tickets]);

  // useEffect(()=>{
  //   (async()=>{
  //    return await dispatch(getTicke)
  //   })
  // })
  const [currentCode, setCurrentCode] = useState('');

  const handleCheck = async (checked_in: boolean, ticket_id: string, code: string) => {
    setCurrentCode(code);
    if (checked_in) {
      await dispatch(checkTicketOut({ data: { ticket_id, code } as object, showID: id as string }))
        .then((res) => {
          const payload = res.payload as PayLoad;
          if (payload.status) {
            return toast.success(payload.message);
          } else {
            return toast.warn(payload.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      await dispatch(checkTicketIn({ data: { ticket_id, code } as object, showID: id as string }))
        .then((res) => {
          const payload = res.payload as PayLoad;
          if (payload.status) {
            return toast.success(payload.message);
          } else {
            return toast.warn(payload.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    await dispatch(getTickets(id as string));
  };

  return (
    <>
      {ticketsLoading ? (
        <Loader />
      ) : (
        <div>
          {subTickets.map((ticket, ticketIndex) => (
            <div key={ticketIndex}>
              <div className="w-max mx-auto py-3 font-rubik font-bold uppercase text-lg">
                {ticket.title}
              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Full name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Phone</TableCell>
                      <TableCell align="right">Action</TableCell>
                      <TableCell align="right">Bought</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {ticket.codes.map((code, codeIndex) => (
                      <TableRow
                        key={codeIndex}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {code.user.fullname}
                        </TableCell>
                        <TableCell align="right">{code.user.email}</TableCell>
                        <TableCell align="right">{code.user.phone}</TableCell>
                        <TableCell align="right">
                          <button
                            type="button"
                            className="w-40 py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700 flex justify-center"
                            onClick={() => {
                              handleCheck(code.is_checked_in, ticket._id, code.code) as unknown;
                            }}
                          >
                            {isLoading && currentCode === code.code ? (
                              <TailSpin color="white" height={20} width={20} />
                            ) : code.is_checked_in ? (
                              'Check Out'
                            ) : (
                              'Check In'
                            )}
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          {moment(code.created_at).format('MMMM Do YYYY')}
                        </TableCell>
                        <TableCell>
                          {code.is_checked_in ? (
                            <div className="text-right font-[700] text-lime-500">Checked In</div>
                          ) : (
                            <div className="text-right font-[700] text-orange-500">
                              Not Checked In
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EventSubscribers;
