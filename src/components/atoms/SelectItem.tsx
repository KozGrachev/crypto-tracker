import { ListboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";


export interface SelectItemProps<T> {
  value: T;
  children: React.ReactNode;
  disabled?: boolean;
}


export function SelectItem<T> ({
  value,
  children,
  disabled = false,
}: SelectItemProps<T>) {
  return (
    <ListboxOption
      value={value}
      disabled={disabled}
      className={({ focus, selected, disabled }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${focus
          ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100"
          : "text-gray-900 dark:text-white"
        } ${selected ? "bg-indigo-50 dark:bg-indigo-900/30" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`
      }
    >
      {({ selected }) => (
        <>
          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
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
