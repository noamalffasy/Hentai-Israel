interface ButtonContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function ButtonContainer({
  className,
  children,
  ...buttonProps
}: ButtonContainerProps) {
  return (
    <button
      className={`${
        className ?? ""
      } cursor-pointer overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-400/50 transition-colors hover:from-blue-700 hover:to-blue-600 disabled:cursor-default disabled:opacity-75 disabled:hover:from-blue-600 disabled:hover:to-blue-500`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
