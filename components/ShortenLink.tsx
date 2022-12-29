"use client";

import { useState } from "react";
import ShortenLinkForm from "../components/ShortenLinkForm";
import ButtonContainer from "./buttons/ButtonContainer";
import PlusIcon from "./icons/PlusIcon";

export default function ShortenLink() {
  const [numLinksGenerated, setNumLinksGenerated] = useState(1);

  return (
    <div className="flex flex-col items-center space-y-4">
      {Array(numLinksGenerated)
        .fill(0)
        .map((_, i) => (
          <ShortenLinkForm key={i} />
        ))}
      <ButtonContainer
        className="rounded-full px-2 py-2"
        onClick={() => setNumLinksGenerated(numLinksGenerated + 1)}
      >
        <PlusIcon className="h-6 w-6" />
      </ButtonContainer>
    </div>
  );
}
