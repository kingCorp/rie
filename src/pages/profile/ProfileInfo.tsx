/* eslint-disable */
import { FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';
import { ButtonAction, InputField } from '../../components/shared/Common';
import Auth from '../../middleware/storage';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import cancel from '../../assets/img/canceledit.svg';
import { addAccountDetails, deleteAccountDetails } from '../../redux/actions/auth';
import { toast, ToastContainer } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { PAYSTACK_PUBLIC_KEY } from '../../utils/constants';
import { setAccountLoading } from '../../redux/reducers/loaderSlice';
import Api from '../../services/apis';
type PayLoad = {
  status: boolean;
  message: string;
};
export type Account = {
  active: boolean;
  _id: string;
  organizer: string;
  name: string;
  number: string;
  bank_name: string;
  created_at: string;
  updated_at: string;
};
const ProfileInfo = () => {
  const dispatch = useAppThunkDispatch();
  const [user] = useState(Auth.getUser());
  const [role] = useState(Auth.getRole());
  const { accountLoading } = useAppSelector((state) => state.loader);
  const [banks, setBanks] = useState([]);
  const [accountVerify, setAccountVerify] = useState(false);
  const [accounts, setAccounts] = useState([] as Array<Account>);
  const [deleteLoading, setDeleteLoading] = useState({
    accountId: '',
    loading: false,
  });
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    number: '',
    bank_name: '',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAccountVerify(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
  };
  useEffect(() => {
    Auth.setAccounts(accounts as []);
  }, [accounts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addAccountDetails(accountDetails))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
          setAccountDetails({
            name: '',
            number: '',
            bank_name: '',
          });
          userInfo();
          handleClose();
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [selectValue, setSelectValue] = useState('');
  const handleSelect = (e: SelectChangeEvent) => {
    setSelectValue(e.target.value as string);
    setAccountDetails({
      ...accountDetails,
      bank_name: e.target.value,
    });
    console.log(e.target.value, e.target);
  };

  const fetchBanks = async () => {
    try {
      const res = await axios.get('https://api.paystack.co/bank', {
        headers: { Authorization: 'Bearer ' + PAYSTACK_PUBLIC_KEY },
      });
      setBanks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const verify = () => {
    if (accountDetails.number.length == 10 && selectValue != '') {
      verifyAccount();
    } else {
      toast('Account deatails not correct');
    }
  };

  const verifyAccount = async () => {
    try {
      dispatch(setAccountLoading(true));
      const res = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountDetails.number}&bank_code=${selectValue}`,
        {
          headers: { Authorization: 'Bearer sk_test_dcb289326fc77eaf77e4f1b3f284a97160d8a4bd' },
        },
      );
      dispatch(setAccountLoading(false));
      console.log(res.data.data);
      setAccountDetails({
        ...accountDetails,
        name: res.data.data.account_name,
      });
      setAccountVerify(true);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      console.log(err?.response?.data?.message);
      toast(err?.response?.data?.message);
      setAccountVerify(false);
    }
  };

  useEffect(() => {
    fetchBanks();
    userInfo();
  }, []);

  const handleAccountDelete = async (accountId: string) => {
    setDeleteLoading({
      accountId: accountId,
      loading: true,
    });
    await dispatch(deleteAccountDetails(accountId))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          setAccounts(accounts.filter((item) => item._id !== accountId));
          setDeleteLoading({
            accountId: '',
            loading: false,
          });
          toast.success(payload.message);
          setAccountDetails({
            name: '',
            number: '',
            bank_name: '',
          });
          handleClose();
        } else {
          console.log('error', payload);
          toast.error(payload.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const userInfo = async () => {
    try {
      console.log(role);
      const res = role == 'user' ? await Api.user.userDetails() : await Api.user.organizerDetails();
      console.log(res.data.data.accountInfo);
      setAccounts(res.data.data.accountInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white-100 py-10">
      <ToastContainer />
      <h2 className="font-bold">Profile Details</h2>
      <br />
      <h2>Full name: {user.fullname}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Phone: {user.phone}</h2>
      <br />
      {Auth.getRole() == 'organizer' && (
        <div>
          <h2 className="font-bold">Account Information</h2>
          <div>
            {accounts?.map((account: Account, key) => (
              <div
                key={key}
                className="flex justify-between rounded-lg shadow-lg p-5 items-center mt-8 space-x-5"
              >
                <div>
                  {banks.map((bank: { name: string; code: string }, i) => {
                    if (bank.code == account.bank_name) {
                      return <p>{bank.name}</p>;
                    }
                    return;
                  })}
                  <p>{account.name}</p>
                  <p>{account.number}</p>
                </div>
                <div>
                  <ButtonAction
                    name="Delete"
                    type="button"
                    loading={
                      deleteLoading.accountId === account._id ? deleteLoading.loading : false
                    }
                    onClick={() => handleAccountDelete(account._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <br />
          <div className="mt-6">
            <ButtonAction name="Add" onClick={handleOpen} />
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="w-11/12 md:w-2/4 lg:w-1/3 m-auto bg-gray-50 rounded-xl overflow-hidden mt-40">
              <div>
                <button onClick={handleClose} className="m-4">
                  <img src={cancel} alt="cancel" className="w-6" />
                </button>
              </div>
              <div className="text-center py-4 ">
                <h2 className="font-bold font-rubik text-2xl">Add Account Information</h2>
              </div>
              <div className=" flex flex-col items-center pt-6 sm:pt-0 homebg">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                  <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select your bank</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectValue}
                        label="Select your bank"
                        onChange={handleSelect}
                        sx={{
                          borderRadius: '20px',
                        }}
                      >
                        {banks.map((bank: { name: string; code: string }, i) => {
                          return (
                            <MenuItem key={i} value={bank?.code}>
                              {bank?.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <InputField
                      name="number"
                      label="Account Number"
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    />
                    <InputField
                      name="name"
                      label="Account Name"
                      type="text"
                      value={accountDetails.name}
                      readonly={true}
                    />
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      {accountLoading ? (
                        <ButtonAction name="Add Account" type="submit" disabled loading />
                      ) : accountVerify ? (
                        <ButtonAction name="Add Account" type="submit" />
                      ) : (
                        <ButtonAction name="Verify" type="button" onClick={verify} />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}

      <br />
    </div>
  );
};

export default ProfileInfo;
