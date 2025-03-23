"use client";

import { defaultCurrency } from '@/constants/defaults';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export type Currency = 'usd' | 'eur' | 'gbp';

export const currencySymbols: Record<Currency, string> = {
  gbp: '£',
  usd: '$',
  eur: '€'
};

const CurrencySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCurrency = searchParams.get('currency') as Currency || defaultCurrency;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleCurrencyClick = (currency: Currency) => (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the dropdown from closing immediately
    // Create a new URLSearchParams object based on the current params
    const newParams = new URLSearchParams(searchParams.toString());

    // Update the currency parameter
    newParams.set('currency', currency);


    // Replace the current URL without pushing to history stack
    router.replace(`?${newParams.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative inline-block text-left`}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="mr-1">{currencySymbols[selectedCurrency]}</span>
          <span>{selectedCurrency.toLocaleUpperCase()}</span>
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.entries(currencySymbols).map(([currency, symbol]) => (
              <button
                key={currency}
                className={`${currency === selectedCurrency
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-200'
                  } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
                role="menuitem"
                onClick={handleCurrencyClick(currency as Currency)}
              >
                <span className="mr-2">{symbol}</span>
                <span>{currency.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;

