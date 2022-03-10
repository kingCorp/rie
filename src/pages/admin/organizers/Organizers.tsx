import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppSelector, useAppThunkDispatch } from '../../../redux/store';
import { getOrganizers } from '../../../redux/actions/admin';
import { Loader } from '../../../components/shared/Common';

interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

const AdminOrganizers = () => {
  const dispatch = useAppThunkDispatch();
  const { organizers } = useAppSelector((state) => state.admin);
  const { isLoading } = useAppSelector((state) => state.loader);

  const [userRows, setUserRows] = useState([] as Array<User>);
  useEffect(() => {
    setUserRows(organizers);
  }, [organizers]);
  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getOrganizers({}))) as unknown;
    };
    anony()
      .then(() => {})
      .catch(() => {});
    // eslint-disable-next-line
  }, []);
  return (
    <AdminLayout>
      <p className="text-2xl font-bold">Users</p>
      {isLoading ? (
        <Loader />
      ) : (
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
              {userRows.map((row) => (
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
                  <TableCell align="right">
                    {moment(row.created_at).format('MMMM Do YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </AdminLayout>
  );
};

export default AdminOrganizers;
