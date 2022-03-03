import React, { MutableRefObject, useRef } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { TailSpin } from 'react-loader-spinner';

type NavLinkDarkProps = { path: string; name: string };

type ButtonActionProps = {
  onClick?: React.MouseEventHandler;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

type TabButtonActionProps = { onClick?: () => void; name: string; active?: boolean };

type InputFieldProps = {
  type: string;
  name: string;
  label: string;
  value?: string | number | readonly string[] | undefined;
  placeholder?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler;
};

type SelectFieldProps = {
  value: string;
  label: string;
  onChange: (e: SelectChangeEvent) => void;
};

type AlertProps = {
  title: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
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

export const ButtonAction = ({ onClick, name, type, disabled, loading }: ButtonActionProps) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disabled ? disabled : false}
      className={`flex w-40 justify-center py-2  text-base font-medium rounded-full text-white ${
        disabled ? 'bg-gray-400 text-gray-300' : 'bg-red-600 hover:bg-gray-700'
      }`}
    >
      {loading ? <TailSpin color="red" height={30} width={30} /> : name}
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

export const InputField = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        required
        onChange={onChange}
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block w-full"
      />
    </div>
  );
};

export const SelectField = ({ value, label, onChange }: SelectFieldProps) => {
  return (
    <div>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
        sx={{
          borderRadius: '16px',
        }}
        required
      >
        <MenuItem value={'organizer'}>YES</MenuItem>
        <MenuItem value={'user'}>NO</MenuItem>
      </Select>
    </div>
  );
};

export const AlertNote = ({ title, message, severity }: AlertProps) => {
  return (
    <div>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

export const CheckField = ({
  type,
  name,
  label,
  placeholder,
  checked,
  onChange,
}: InputFieldProps) => {
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
        checked={checked}
        className="py-2 px-3 border border-gray-500 focus:border-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 rounded-full shadow-sm disabled:bg-gray-100 mt-1 block"
      />
    </div>
  );
};

export const Loader = () => {
  return (
    <div className="flex items-center justify-center p-14">
      <TailSpin color="red" height={80} width={80} />
    </div>
  );
};
