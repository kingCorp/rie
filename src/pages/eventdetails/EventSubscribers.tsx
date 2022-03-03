import moment from 'moment';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonAction } from '../../components/shared/Common';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

const UserRows = [
  {
    _id: '1',
    fullname: 'Owhondah Okechukwu Samuel',
    email: 'kidsam421@gmail.com',
    phone: '+2347089954511',
    created_at: '2022-02-23T19:12:11.052Z',
    updated_at: '2022-03-02T07:17:54.172Z',
  },
  {
    _id: '2',
    fullname: 'Owhondah Okechukwu Samuel',
    email: 'kidsam421@gmail.com',
    phone: '+2347089954511',
    created_at: '2022-02-23T19:12:11.052Z',
    updated_at: '2022-03-02T07:17:54.172Z',
  },
  {
    _id: '3',
    fullname: 'Owhondah Okechukwu Samuel',
    email: 'kidsam421@gmail.com',
    phone: '+2347089954511',
    created_at: '2022-02-23T19:12:11.052Z',
    updated_at: '2022-03-02T07:17:54.172Z',
  },
  {
    _id: '4',
    fullname: 'Owhondah Okechukwu Samuel',
    email: 'kidsam421@gmail.com',
    phone: '+2347089954511',
    created_at: '2022-02-23T19:12:11.052Z',
    updated_at: '2022-03-02T07:17:54.172Z',
  },
  {
    _id: '5',
    fullname: 'Owhondah Okechukwu Samuel',
    email: 'kidsam421@gmail.com',
    phone: '+2347089954511',
    created_at: '2022-02-23T19:12:11.052Z',
    updated_at: '2022-03-02T07:17:54.172Z',
  },
];

const EventSubscribers = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Full name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Joined</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {UserRows.map((row) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
                <button
                  type="button"
                  className="w-40 py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
                >
                  Action
                </button>
              </TableCell>
              <TableCell align="right">{moment(row.created_at).format('MMMM Do YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventSubscribers;
