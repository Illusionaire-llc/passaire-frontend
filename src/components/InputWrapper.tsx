import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  dir: "column" | "row";
  children: ReactNode;
};
const InputWrapper = ({ dir = "column", children, className }: Props) => {
  return (
    <span
      style={{ flexDirection: dir }}
      className={`w-1/2 max-md:w-full flex flex-[${dir}] gap-2 items-start justify-start mb-2 ${className}`}
    >
      {children}
    </span>
  );
};

export default InputWrapper;
