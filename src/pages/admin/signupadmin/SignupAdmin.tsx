import React, { useEffect, useState } from 'react';
import rt from '../../../assets/img/rieicon.png';
import { ButtonAction, InputField } from '../../../components/shared/Common';
import { paths } from '../../../utils/constants';
import { useAppThunkDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Link } from 'react-router-dom';
import { signInAdmin, signUpAdmin } from '../../../redux/actions/admin';

type PayLoad = {
  status: boolean;
  message: string;
};

const SignUpAdmin = () => {
  const { isLoading } = useSelector((state: RootState) => state.loader);
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (signedUp) {
      const anony = async () => {
        return await dispatch(
          signInAdmin({
            data: { email: signUpDetails.email, password: signUpDetails.password },
          }),
        );
      };
      anony()
        .then((res) => {
          const payload = res.payload as PayLoad;
          if (payload.status) {
            toast.success(payload.message);
            navigate('/dashboard');
          } else {
            toast.error(payload.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line
  }, [signedUp]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submits');
    e.preventDefault();
    if (signUpDetails.email === '' || signUpDetails.password === '') {
      toast('Kindly fill all fields');
      return;
    }

    await dispatch(signUpAdmin(signUpDetails))
      .then((res) => {
        const payload = res.payload as PayLoad;
        console.log(payload, res);
        if (payload.status) {
          toast.success(payload.message);
          setSignedUp(true);
        } else {
          toast.error(payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 homebg">
        <div className="w-full sm:max-w-md p-5 mx-auto">
          <div className="flex justify-center py-3">
            <a href={paths.HOME}>
              <img
                src={rt}
                alt="logo"
                className="h-10 object-cover sm:h-12 md:h-16 lg:w-100 lg:h-100"
              />
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <InputField
              name="fullname"
              label="Full name"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="email"
              label="Email-Address"
              type="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />

            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              {isLoading ? (
                <ButtonAction name="Sign up" type="submit" disabled loading />
              ) : (
                <ButtonAction name="Sign up" type="submit" />
              )}
            </div>
            <div className="mt-6 text-center">
              <Link to={paths.ADMIN} className="underline font-bold">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpAdmin;
