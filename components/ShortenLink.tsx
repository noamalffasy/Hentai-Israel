"use client";

import { useState } from "react";
import ShortenLinkForm from "../components/ShortenLinkForm";
import ButtonContainer from "./buttons/ButtonContainer";
import PlusIcon from "./icons/PlusIcon";

export default function ShortenLink() {
  const [linksGenerated, setUrlsGenerated] = useState<(string | null)[]>([
    null,
  ]);

  console.log(linksGenerated);

  return (
    <div className="flex flex-col items-center space-y-4">
      {linksGenerated.map((_, i) => (
        <ShortenLinkForm
          onUrlGenerated={(url) => {
            console.log("url generated");

            setUrlsGenerated([
              ...linksGenerated.slice(0, linksGenerated.length - 1),
              url,
            ]);
            console.log([
              ...linksGenerated.slice(0, linksGenerated.length - 1),
              url,
            ]);
          }}
          key={i}
        />
      ))}
      {linksGenerated[linksGenerated.length - 1] && (
        <ButtonContainer
          className="rounded-full px-2 py-2 mt-8"
          onClick={() => setUrlsGenerated([...linksGenerated, null])}
        >
          <PlusIcon className="h-6 w-6" />
        </ButtonContainer>
      )}
    </div>
  );
}
