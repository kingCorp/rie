import React from 'react';
import { PaystackButton } from 'react-paystack';
import { v4 } from 'uuid';
import { PAYSTACK_PUBLIC_KEY } from '../../utils/constants';
// import { ButtonAction } from '../shared/Common';

type PaystackMetaData = {
  name: string;
  phone: string;
  custom_fields: [];
};

interface PaystackProps {
  email: string;
  name: string;
  phone: string;
  amount: number;
  disabled?: boolean;
  setReference: React.Dispatch<React.SetStateAction<string>>;
}
export default function Paystack({
  email,
  name,
  phone,
  amount,
  disabled,
  setReference,
}: PaystackProps) {
  const publicKey = PAYSTACK_PUBLIC_KEY as string;
  amount = amount * 100; // Remember, set in kobo!

  const componentProps = {
    email,
    amount,
    reference: `RIETICKET-${v4()}-${new Date().valueOf().toString()}`,
    metadata: {
      name,
      phone,
    } as PaystackMetaData,
    publicKey,
    text: 'Buy Tickets',
    onSuccess: () => {
      console.log('success');
      setReference(componentProps.reference);
    },
    onClose: () => alert('Bruh Chill'),
  };

  return (
    <div className="">
      <div className="">
        {disabled ? (
          <button
            className=" w-40  py-2  text-base font-medium rounded-full  bg-gray-400 text-gray-300"
            type="submit"
            disabled
          >
            Buy Tickets
          </button>
        ) : (
          <PaystackButton
            className=" w-40  py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
            {...componentProps}
          />
        )}
      </div>
    </div>
  );
}
