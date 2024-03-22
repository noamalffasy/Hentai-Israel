"use client";

import { useState } from "react";

import CheckmarkIcon from "../icons/CheckmarkIcon";
import CopyIcon from "../icons/CopyIcon";
import ShortenButtonContainer from "./containers/ShortenButtonContainer";

interface Props {
  className?: string;
  data: string;
}

export default function CopyButton({ className, data }: Props) {
  const [showCopied, setShowCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined,
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
          }, 1000),
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
