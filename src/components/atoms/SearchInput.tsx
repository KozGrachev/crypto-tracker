'use client';

import { Input } from "@headlessui/react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Filter by name or symbol..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-h-10 max-w-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500"
    />
  );
};

export default SearchInput;
