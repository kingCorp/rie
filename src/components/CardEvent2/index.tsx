import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  img?: string;
  title: string;
  date: string;
  price: number;
  href?: string;
  booked?: boolean;
  children?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line
export default function CardEvent2({ img, title, date, href, booked, onClick, children }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
    >
      <Link
        to={href ? href : '#'}
        className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
      >
        <div className="relative w-full h-80 md:h-64 lg:h-60">
          <img src={img} alt={title} className="w-full h-full object-cover rounded-t-lg" />
          {children ? children : ''}
        </div>
      </Link>
      <div className="px-3 py-3">
        <div className="flex justify-between">
          <p className="text-base lg:text-xl font-bold text-gray-900 group-hover:text-red-600">
            {title}
          </p>
          {booked && <FontAwesomeIcon icon={faCheckCircle} size="1x" color="red" />}
        </div>
        <div className="flex justify-between">
          <p className="text-base lg:text-sm text-gray-700 font-semibold">{date}</p>
          {/* <p className="text-base text-gray-900 font-bold">{price}</p> */}
        </div>
      </div>
    </div>
  );
}
