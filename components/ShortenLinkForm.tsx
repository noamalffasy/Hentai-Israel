"use client";

import { FormEventHandler, useState } from "react";
import LinkIcon from "./icons/LinkIcon";
import ShortenButton from "./buttons/ShortenButton";

export default function ShortenLinkForm() {
  const [isLoading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true);

    e.preventDefault();

    const urlElem = e.currentTarget.elements.namedItem(
      "url"
    )! as HTMLInputElement;

    try {
      const res = await fetch("/api/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlElem.value }),
      });
      const result = (await res.json()) as { url: string };

      urlElem.value = result.url;
      setUrl(result.url);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <form
      className="w-full space-y-4 overflow-hidden rounded-xl bg-white px-2 py-4 shadow-xl shadow-blue-400/50 md:px-4 lg:px-6"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center space-x-2 space-x-reverse overflow-hidden rounded-xl bg-blue-50 px-2 py-2 lg:px-4">
        <LinkIcon className="h-4 w-4 text-slate-500" />
        <input
          className="h-full flex-1 bg-transparent outline-none ring-0 disabled:opacity-50"
          placeholder="הדבק קישור לקצר להנטאי.ישראל"
          type="text"
          name="url"
          id="url"
          disabled={isLoading || url.length > 0}
        />
        <ShortenButton
          className="hidden sm:block"
          isLoading={isLoading}
          url={url}
        />
      </div>
      <ShortenButton
        className="block w-full sm:hidden"
        isLoading={isLoading}
        url={url}
      />
    </form>
  );
}
