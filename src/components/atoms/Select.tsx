"use client";

import { Fragment } from "react";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
import { Currency, currencySymbols } from "../molecules/CurrencySelect";

export interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  children: React.ReactNode;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Select<T>({
  value,
  onChange,
  children,
  label,
  className,
  disabled = false,
}: SelectProps<T>) {

  const valueString = value as string

  return (
    <Field className={twMerge("relative w-full", className)}>
      {label && (
        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 mb-1">
          {label}
        </Label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <div className="flex items-center">
              <span className="mr-1">{currencySymbols[value as Currency]}</span>
              <span>{valueString.toUpperCase()}</span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none sm:text-sm">
              {children}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </Field>
  );
}

export interface SelectItemProps<T> {
  value: T;
  children: React.ReactNode;
  disabled?: boolean;
}

export function SelectItem<T>({
  value,
  children,
  disabled = false,
}: SelectItemProps<T>) {
  return (
    <ListboxOption
      value={value}
      disabled={disabled}
      className={({ focus, selected, disabled }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          focus
            ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100"
            : "text-gray-900 dark:text-white"
        } ${selected ? "bg-indigo-50 dark:bg-indigo-900/30" : ""} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`
      }
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? "font-medium" : "font-normal"
            }`}
          >
            {children}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-400">
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
        </>
      )}
    </ListboxOption>
  );
}

