"use client";

import React, { useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';
import { formatCurrency, formatLargeNumber } from '@/utils/formatters';
import { Coin } from '@/types/coin';

interface CoinTableProps {
  coins: Coin[];
  currency: string;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, currency }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Coin>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('market_cap_rank', {
        header: 'Rank',
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-8 h-8 relative">
              <Image
                src={info.row.original.image}
                alt={info.getValue()}
                fill
                sizes="32px"
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <p className="font-medium">{info.getValue()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                {info.row.original.symbol}
              </p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('current_price', {
        header: 'Price',
        cell: (info) => formatCurrency(info.getValue(), currency),
      }),
      columnHelper.accessor('price_change_percentage_24h', {
        header: '24h Change',
        cell: (info) => {
          const value = info.getValue();
          const isPositive = value >= 0;
          return (
            <span
              className={`${isPositive ? 'text-green-500' : 'text-red-500'
                } font-medium`}
            >
              {isPositive ? '+' : ''}
              {value.toFixed(2)}%
            </span>
          );
        },
      }),
      columnHelper.accessor('market_cap', {
        header: 'Market Cap',
        cell: (info) => formatLargeNumber(info.getValue(), currency),
      }),
    ],
    [columnHelper, currency]
  );

  const table = useReactTable({
    data: coins,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!coins.length) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400" >
        No coins match your search.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                    <div className="flex items-center space-x-1">
                        <span>
                        {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                        )}
                        </span>
                        <span>
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                    </th>
                  ))}
              </tr>
            ))}
        </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                    >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
