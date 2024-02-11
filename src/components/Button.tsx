import { ButtonHTMLAttributes, ReactNode } from "react";
import { ImSpinner8 } from "react-icons/im";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending?: boolean;
  children: ReactNode;
  spinnerClassName?: string;
};
const Button = ({
  children,
  isPending,
  className,
  spinnerClassName,
  ...rest
}: Props) => {
  return (
    <button
      className={`w-full max-xs:w-full flex items-center justify-center gap-4 px-4 py-2 bg-gradient-to-tr from-secondary-100 to-secondary-200 text-white font-semibold capitalize rounded-md hover:brightness-125 disabled:from-slate-400 disabled:to-slate-300 disabled:cursor-not-allowed ${className}`}
      {...rest}
      // disabled={isEmptyMentorship && isEmptyWorkshop}
    >
      {isPending && (
        <span
          className={`inline-block text-3xl text-slate-800 animate-spin ${spinnerClassName}`}
        >
          <ImSpinner8 />
        </span>
      )}
      {!isPending && children}
    </button>
  );
};

export default Button;
