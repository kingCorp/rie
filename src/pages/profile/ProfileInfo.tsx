import { Modal } from '@mui/material';
import React, { useState } from 'react';
import { ButtonAction, InputField } from '../../components/shared/Common';
import Auth from '../../middleware/storage';
import { useAppSelector, useAppThunkDispatch } from '../../redux/store';
import cancel from '../../assets/img/canceledit.svg';
import { addAccountDetails } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
type PayLoad = {
  status: boolean;
  message: string;
};
const ProfileInfo = () => {
  const dispatch = useAppThunkDispatch();
  const [user] = useState(Auth.getUser());
  const { accountLoading } = useAppSelector((state) => state.loader);
  const [accountDetails, setAccountDetails] = useState({
    name: '',
    number: '',
    bank_name: '',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addAccountDetails(accountDetails))
      .then((res) => {
        const payload = res.payload as PayLoad;
        if (payload.status) {
          toast.success(payload.message);
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

  return (
    <div className="bg-gray group relative rounded-lg border overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
      <div className="bg-white-100 py-10 px-10">
        <h2 className="font-bold">Profile Details</h2>
        <br />
        <h2>Full name: {user.fullname}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Phone: {user.phone}</h2>
        <br />
        {Auth.getRole() == 'organizer' && (
          <div>
            <h2 className="font-bold">Account Information</h2>
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
                      <InputField
                        name="name"
                        label="Account Name"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      />
                      <InputField
                        name="number"
                        label="Account Number"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      />
                      <InputField
                        name="bank_name"
                        label="Bank Name"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                      />
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        {accountLoading ? (
                          <ButtonAction name="Add Account" type="submit" disabled loading />
                        ) : (
                          <ButtonAction name="Add Account" type="submit" />
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
    </div>
  );
};

export default ProfileInfo;
