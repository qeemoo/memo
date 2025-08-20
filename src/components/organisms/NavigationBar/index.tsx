'use client';

import Link from 'next/link';

import { useState } from 'react';

const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownItems = [
    { href: '/epub/compare', label: '파일 비교' },
    { href: '/epub/2', label: '2' },
    { href: '/epub/3', label: '3' },
    { href: '/epub/4', label: '4' },
    { href: '/epub/5', label: '5' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            epub
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                {dropdownItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref legacyBehavior>
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
