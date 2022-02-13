import React from 'react';

type Props = {
  img?: string;
  title: string;
  date: string;
  price: number;
  href: string;
};

export default function CardEvent({ img, title, date, price, href }: Props) {
  return (
    <a
      href={href}
      className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
    >
      <div className="relative w-full h-80 md:h-64 lg:h-60">
        <img src={img} alt={title} className="w-full h-full object-cover object-fill rounded-lg" />
      </div>
      <div className="px-3 py-3">
        <p className="text-base lg:text-xl font-bold text-gray-900 group-hover:text-red-600">
          {title}
        </p>
        <div className="flex justify-between">
          <p className="text-base lg:text-sm text-gray-700 font-semibold">{date}</p>
          <p className="text-base text-gray-900 font-bold">{price}</p>
        </div>
      </div>
    </a>
  );
}
