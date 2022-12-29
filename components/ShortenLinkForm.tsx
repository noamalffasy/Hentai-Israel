"use client";

import { FormEventHandler, useState } from "react";
import { LinkError } from "../pages/api/link";
import CopyButton from "./buttons/CopyButton";
import ShortenButton from "./buttons/ShortenButton";
import ErrorMessage from "./ErrorMessage";
import LinkIcon from "./icons/LinkIcon";

interface Props {
  onUrlGenerated: (url: string) => void;
}

export default function ShortenLinkForm({ onUrlGenerated }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const [error, setError] = useState<number | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true);

    e.preventDefault();

    const urlElem = e.currentTarget.elements.namedItem(
      "url"
    )! as HTMLInputElement;

    try {
      const response = await fetch("/api/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlElem.value }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error: number };

        throw result.error;
      }

      const result = (await response.json()) as { url: string };

      urlElem.value = result.url;

      setUrl(result.url);
      onUrlGenerated(result.url);
    } catch (e) {
      if (typeof e === "number") {
        setError(e);
      } else {
        setError(LinkError.Unknown);
      }
    }

    setLoading(false);
  };

  return (
    <form
      className={`w-full space-y-4 overflow-hidden rounded-xl bg-white px-2 py-4 shadow-lg shadow-blue-400/25 md:px-4 lg:px-6 ${
        url.length === 0 ? "!mb-14" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center space-x-2 space-x-reverse overflow-hidden rounded-xl bg-blue-50 px-2 py-2 lg:px-4">
        <LinkIcon className="h-4 w-4 text-slate-500" />
        <input
          className="h-full flex-1 bg-transparent outline-none ring-0 disabled:opacity-50"
          placeholder="הדבק קישור לקצר להנטאי.ישראל"
          type="url"
          name="url"
          id="url"
          disabled={isLoading || url.length > 0}
          required
        />
        {url.length === 0 ? (
          <ShortenButton className="hidden sm:block" isLoading={isLoading} />
        ) : (
          <CopyButton data={`https://${url}`} />
        )}
      </div>
      {error !== null && <ErrorMessage error={error} />}
      {url.length === 0 && (
        <ShortenButton
          className="block w-full sm:hidden"
          isLoading={isLoading}
        />
      )}
    </form>
  );
}
