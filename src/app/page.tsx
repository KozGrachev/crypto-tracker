import { Suspense } from 'react';
import CoinTable from '@/components/organisms/CoinTable';
import CurrencySelect from '@/components/molecules/CurrencySelect';
import { SearchParams } from 'next/dist/server/request/search-params';
import { defaultCurrency } from '@/constants/defaults';

// Type definition for coin data
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

// Loading component
function LoadingCoins () {
  return (
    <div className="w-full flex justify-center items-center p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Loading cryptocurrency data...</h2>
        <p className="text-gray-500">Fetching the latest market information</p>
      </div>
    </div>
  );
}

// Error component
function ErrorDisplay ({ error }: { error: Error }) {
  return (
    <div className="w-full bg-red-50 p-6 rounded-lg border border-red-200">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Error loading data</h2>
      <p className="text-red-600">{error.message}</p>
      <p className="mt-4 text-gray-700">
        Please try again later or check your internet connection.
      </p>
    </div>
  );
}

// Server Component to fetch data
async function CoinData ({ currency = 'usd' }: { currency?: string }) {
  try {
    // Fetch top 50 cryptocurrencies from CoinGecko API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const coins: Coin[] = await response.json();

    // This component will be created later
    return <>
      <CoinTable coins={coins} currency={currency} />
    </>;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return <ErrorDisplay error={error instanceof Error ? error : new Error('Unknown error occurred')} />;
  }
}

// Main Page Component
export default function CryptoTracker({ searchParams }: { searchParams: SearchParams }) {
  // Get currency from search params or use 'usd' as default
  const currency = (searchParams.currency as string) || defaultCurrency;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market Tracker</h1>
      <CurrencySelect />
      <Suspense fallback={<LoadingCoins />}>
        <CoinData currency={currency} />
      </Suspense>
    </main>
  );
}

