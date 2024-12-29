import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  children,
  className,
  isDisabled = false,
  onClick,
}: {
  children: ReactNode;
  className: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const disabledClass = "bg-neutral-400 text-white hover:bg-neutral-400";
  const disableText = "ناموجود";
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${className} ${isDisabled ? disabledClass : ""}`}
    >
      {isDisabled ? disableText : children}
    </button>
  );
}
