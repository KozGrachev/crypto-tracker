'use client';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

interface CoinInfoModalProps {
  coinId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CoinDetail {
  id: string;
  name: string;
  description: { en: string };
  image: { thumb: string; small: string; large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
  };
}

const fetchCoinDetail = async (coinId: string): Promise<CoinDetail> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  if (!res.ok) throw new Error(`Failed to fetch coin details: ${res.status}`);
  return res.json();
};

const CoinInfoModal: React.FC<CoinInfoModalProps> = ({ coinId, isOpen, onClose }) => {
  const {
    data: coinDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['coin-detail', coinId],
    queryFn: () => fetchCoinDetail(coinId),
    enabled: isOpen && !!coinId,
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="fixed inset-0 transition-opacity backdrop-blur-md bg-opacity-30" />
          </TransitionChild>

          {/* Trick to center modal contents */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-800 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white dark:bg-gray-800 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 sm:mx-0 sm:h-12 sm:w-12">
                    {coinDetail?.image?.thumb && (
                      <div className="relative w-8 h-8">
                        <Image
                          src={coinDetail.image.thumb}
                          alt={coinDetail.name}
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {coinDetail ? coinDetail.name : 'Loading...'}
                    </DialogTitle>
                    <div className="mt-2">
                      {isLoading && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading coin details...</p>
                      )}
                      {isError && (
                        <p className="text-sm text-red-500">
                          {(error as Error)?.message || 'Something went wrong.'}
                        </p>
                      )}
                      {coinDetail && !isLoading && !isError && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <p>{coinDetail.description.en?.slice(0, 200)}...</p>
                          <p className="mt-2">
                            Current Price: ${coinDetail.market_data.current_price.usd.toLocaleString()}
                          </p>
                          <p>
                            Market Cap: ${coinDetail.market_data.market_cap.usd.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CoinInfoModal;
