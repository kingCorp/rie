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
import { getUsers } from '../../../redux/actions/admin';
import { Loader } from '../../../components/shared/Common';

interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

const AdminUsers = () => {
  const dispatch = useAppThunkDispatch();
  const { users } = useAppSelector((state) => state.admin);
  const { isLoading } = useAppSelector((state) => state.loader);

  const [userRows, setUserRows] = useState([] as Array<User>);
  useEffect(() => {
    setUserRows(users);
  }, [users]);
  useEffect(() => {
    const anony = async () => {
      return (await dispatch(getUsers({}))) as unknown;
    };
    anony()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <AdminLayout>
      <div className="">
        <p className="text-2xl font-bold">Organizers</p>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Full name</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Joined</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userRows.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.fullname}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">
                        {moment(row.created_at).format('MMMM Do YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
