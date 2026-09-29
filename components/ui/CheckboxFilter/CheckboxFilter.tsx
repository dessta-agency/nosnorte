"use client";

export type CheckboxOption = {
  id: string;
  label: string;
};

type CheckboxFilterProps = {
  options: CheckboxOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  name: string;
};

export function CheckboxFilter({
  options,
  selectedIds,
  onChange,
  name,
}: CheckboxFilterProps) {
  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((selectedId) => selectedId !== id));
      return;
    }
    onChange([...selectedIds, id]);
  };

  return (
    <ul className="flex flex-col gap-1" role="group" aria-label={name}>
      {options.map(({ id, label }) => {
        const isChecked = selectedIds.includes(id);
        const inputId = `${name}-${id}`;

        return (
          <li key={id}>
            <label
              htmlFor={inputId}
              className="group flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-gray-light focus-within:bg-gray-light"
            >
              <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  id={inputId}
                  type="checkbox"
                  name={name}
                  value={id}
                  checked={isChecked}
                  onChange={() => toggleOption(id)}
                  className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <span
                  aria-hidden
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
                    isChecked
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background"
                  }`}
                >
                  {isChecked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </span>
              <span
                className={`font-sans text-sm transition-colors ${
                  isChecked
                    ? "font-medium text-foreground"
                    : "text-secondary group-hover:text-foreground"
                }`}
              >
                {label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
