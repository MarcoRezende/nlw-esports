import { InputHTMLAttributes, PropsWithChildren } from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropsWithChildren {
  label?: string;
}

export function Input({ id, label, className, children, ...rest }: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}}`}>
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
      )}

      {children ?? (
        <input
          {...rest}
          className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      )}
    </div>
  );
}
