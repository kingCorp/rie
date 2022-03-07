import React from 'react';
import { PaystackButton } from 'react-paystack';
import { v4 } from 'uuid';
import { PAYSTACK_PUBLIC_KEY } from '../../utils/constants';

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
}
export default function Paystack({ email, name, phone, amount, disabled }: PaystackProps) {
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
      console.log(componentProps.reference, 'reference');
    },
    onClose: () => alert('Bruh Chill'),
  };

  return (
    <div className="">
      <div className="">
        <PaystackButton
          className={`flex w-40 justify-center py-2  text-base font-medium rounded-full text-white ${
            disabled ? 'bg-gray-400 text-gray-300' : 'bg-red-600 hover:bg-gray-700'
          }`}
          {...componentProps}
        />
      </div>
    </div>
  );
}
