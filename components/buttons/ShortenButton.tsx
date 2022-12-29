import { useState } from "react";
import CheckmarkIcon from "../icons/CheckmarkIcon";
import CopyIcon from "../icons/CopyIcon";
import LoadingIcon from "../icons/LoadingIcon";
import ButtonContainer from "./ButtonContainer";

function ShortenButtonContainer({
  className,
  ...otherProps
}: Parameters<typeof ButtonContainer>[0]) {
  return (
    <ButtonContainer
      className={`rounded-xl px-2 py-2 md:px-4 md:py-1 lg:px-6 ${className}`}
      {...otherProps}
    />
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
      <ShortenButtonContainer
        type="submit"
        className={className}
        disabled={isLoading}
      >
        {!isLoading ? (
          <span>קצר</span>
        ) : (
          <LoadingIcon className="my-1 mx-[5.5px] h-4 w-4" />
        )}
      </ShortenButtonContainer>
    );

  return <CopyButton className={className} data={url} />;
}

function CopyButton({ className, data }: { className: string; data: string }) {
  const [showCopied, setShowCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  return (
    <ShortenButtonContainer
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
    </ShortenButtonContainer>
  );
}
