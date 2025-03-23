"use client";

import { defaultCurrency } from '@/constants/defaults';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@/components/atoms/Select';
import { SelectItem } from '@/components/atoms/SelectItem';

export type Currency = 'USD' | 'EUR' | 'GBP';

export const currencySymbols: Record<Currency, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€'
};

const CurrencySelect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCurrency = searchParams.get('currency') as Currency || defaultCurrency;

  const handleCurrencyChange = (currency: Currency) => {
    // Create a new URLSearchParams object based on the current params
    const newParams = new URLSearchParams(searchParams.toString());

    // Update the currency parameter
    newParams.set('currency', currency);

    // Replace the current URL without pushing to history stack
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const displayOption = (currency: Currency) => (
    <div className="flex items-center">
      <span className="mr-2">{currencySymbols[currency]}</span>
      <span>{currency.toUpperCase()}</span>
    </div>
  );

  return (
    <div className="w-32">
      <Select
        value={selectedCurrency}
        label='Convert to:'
        onChange={handleCurrencyChange}
        selectedOption={displayOption(selectedCurrency)}
      >
        {Object.entries(currencySymbols).map(([currency]) => (
          <SelectItem key={currency} value={currency}>
            {displayOption(currency as Currency)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default CurrencySelect;

