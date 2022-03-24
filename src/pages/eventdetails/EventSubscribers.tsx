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
  const [newTickets, setNewTickets] = useState([] as Array<Ticket>);
  const dispatch = useAppThunkDispatch();

  useEffect(() => {
    setSubTickets(tickets);
  }, [tickets]);
  useEffect(() => {
    setNewTickets(subTickets);
  }, [subTickets]);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let searchableTickets = newTickets;
    subTickets.forEach((ticket, index) => {
      const NewCodes = ticket.codes.filter((cod) =>
        cod.code.toLowerCase().includes(value.toLowerCase()),
      );
      searchableTickets = searchableTickets.filter((item) => item._id !== subTickets[index]._id);
      searchableTickets = [...searchableTickets, { ...subTickets[index], codes: NewCodes }];
    });
    console.log(searchableTickets);
    setNewTickets(searchableTickets);
  };

  return (
    <>
      {/* {console.log(subTickets)} */}
      {ticketsLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="p-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ticket using codes"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
              />
            </div>
          </div>
          {newTickets.map((ticket, ticketIndex) => (
            <div key={ticketIndex}>
              <div className="w-max mx-auto py-3 font-rubik font-bold uppercase text-lg">
                {ticket.title}
              </div>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Full name</TableCell>
                      <TableCell>Code</TableCell>
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
                        <TableCell align="right">{code.code.toLocaleUpperCase()}</TableCell>
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
