import { ReactNode, useState } from "react";
import CheckmarkIcon from "./icons/CheckmarkIcon";
import CopyIcon from "./icons/CopyIcon";
import LoadingIcon from "./icons/LoadingIcon";

interface ButtonContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

function ButtonContainer({
  className,
  children,
  ...buttonProps
}: ButtonContainerProps) {
  return (
    <button
      className={`${
        className ?? ""
      } cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-2 py-2 text-white shadow-lg shadow-blue-400/50 transition-colors hover:from-blue-700 hover:to-blue-600 disabled:cursor-default disabled:opacity-75 disabled:hover:from-blue-600 disabled:hover:to-blue-500 md:px-4 md:py-1 lg:px-6`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

interface ShortenButtonProps {
  className: string;
  isLoading: boolean;
  url: string;
}
export default function ShortenButton({
  className,
  isLoading,
  url,
}: ShortenButtonProps) {
  if (url.length === 0)
    return (
      <ButtonContainer type="submit" className={className} disabled={isLoading}>
        {!isLoading ? (
          <span>קצר</span>
        ) : (
          <LoadingIcon className="my-1 mx-[5.5px] h-4 w-4" />
        )}
      </ButtonContainer>
    );

  return <CopyButton className={className} data={url} />;
}

function CopyButton({ className, data }: { className: string; data: string }) {
  const [showCopied, setShowCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  return (
    <ButtonContainer
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(data);

        clearTimeout(copyTimeout);
        setShowCopied(true);
        setCopyTimeout(
          setTimeout(() => {
            setShowCopied(false);
          }, 1000)
        );
      }}
    >
      {!showCopied ? (
        <CopyIcon className="mx-[5.5px] my-1 h-4 w-4" />
      ) : (
        <CheckmarkIcon className="mx-[5.5px] my-1 h-4 w-4" />
      )}
    </ButtonContainer>
  );
}
