import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  placeholder?: string;
};

export function FormField({
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: FormFieldProps) {
  const id = registration.name;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
            : "border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-zinc-700 dark:focus:border-indigo-400"
        }`}
        {...registration}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
