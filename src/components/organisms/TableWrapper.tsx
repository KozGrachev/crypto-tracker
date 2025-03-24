'use client';

import { useState, useMemo } from 'react';
import { Coin } from '@/types/coin';
import CoinTable from './CoinTable';
import CurrencySelect from '@/components/molecules/CurrencySelect';
import SearchInput from '@/components/atoms/SearchInput';
import Stack from '../atoms/Stack';

interface CoinTableWrapperProps {
  coins: Coin[];
  currency: string;
}

const CoinTableWrapper: React.FC<CoinTableWrapperProps> = ({ coins, currency }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoins = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return coins;
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  }, [coins, searchQuery]);

  return (
    <div className="space-y-4">
      <Stack orientation='horizontal' gap='12'>
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <CurrencySelect />
      </Stack>
      <CoinTable coins={filteredCoins} currency={currency} />
    </div>
  );
};

export default CoinTableWrapper;
