import { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  onClick,
  disabled,
  className,
  type,
  style,
}: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
      {/* Next */}
    </button>
  );
};

export default Button;
