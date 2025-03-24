import { Suspense } from 'react';
import { SearchParams } from 'next/dist/server/request/search-params';
import { defaultCurrency } from '@/constants/defaults';
import CoinTableWrapper from '@/components/organisms/TableWrapper';
import { CoinDataType } from '@/types/coin';

const LoadingCoins = () => (
  <div className="w-full flex justify-center items-center p-8">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Loading cryptocurrency data...</h2>
      <p className="text-gray-500">Fetching the latest market information</p>
    </div>
  </div>
);

const ErrorDisplay = ({ error }: { error: Error }) => (
  <div className="w-full bg-red-50 p-6 rounded-lg border border-red-200">
    <h2 className="text-xl font-semibold text-red-700 mb-2">Error loading data</h2>
    <p className="text-red-600">{error.message}</p>
    <p className="mt-4 text-gray-700">
      Please try again later or check your internet connection.
    </p>
  </div>
);

const CoinData = async ({ currency = defaultCurrency }: { currency?: string }) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const coins: CoinDataType[] = await response.json();
    return <CoinTableWrapper coins={coins} currency={currency} />;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return (
      <ErrorDisplay error={error instanceof Error ? error : new Error('Unknown error occurred')} />
    );
  }
};

const CryptoTracker = ({ searchParams }: { searchParams: SearchParams }) => {
  const currency = (searchParams.currency as string) || defaultCurrency;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Market Tracker</h1>
      <Suspense fallback={<LoadingCoins />}>
        <CoinData currency={currency} />
      </Suspense>
    </main>
  );
};

export default CryptoTracker;
