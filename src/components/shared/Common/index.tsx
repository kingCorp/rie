import React from 'react';

type NavLinkDarkProps = { path: string; name: string };

type ButtonActionProps = { onClick?: React.MouseEventHandler; name: string };

type TabButtonActionProps = { onClick?: () => void; name: string; active?: boolean };

type InputFieldProps = {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
};

export const NavlinkDark = ({ path, name }: NavLinkDarkProps) => {
  return (
    <a
      href={path}
      className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
    >
      {name}
    </a>
  );
};

export const NavlinkDefault = ({ path, name }: NavLinkDarkProps) => {
  return (
    <a
      href={path}
      className="text-white bg-red-600 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
    >
      {name}
    </a>
  );
};

export const ButtonAction = ({ onClick, name }: ButtonActionProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex w-40 justify-center py-2  text-base font-medium rounded-full text-white bg-red-600 hover:bg-gray-700"
    >
      {name}
    </button>
  );
};

export const TabButtonAction = ({ onClick, name, active = false }: TabButtonActionProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-block relative py-4 px-4 text-sm font-medium text-center text-gray-500 border-b-4 border-transparent ${
        active ? 'border-red-600' : ''
      }`}
    >
      {name}
    </button>
  );
};

export const InputField = ({ type, name, label, placeholder, onChange }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        onChange={onChange}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block w-full"
      />
    </div>
  );
};
