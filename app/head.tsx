const SITE_URL = "https://הנטאי.ישראל";

export default function Head() {
  return (
    <>
      <title>הנטאי.ישראל</title>
      <meta name="description" content="הנטאי. כחול לבן. מקצר הקישורים הישראלי ביותר." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content="הנטאי.ישראל" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:image" content={`${SITE_URL}/og.jpg`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SITE_URL} />
      <meta property="twitter:title" content="הנטאי.ישראל" />
      <meta property="twitter:description" content="הנטאי. כחול לבן." />
      <meta property="twitter:image" content={`${SITE_URL}/og.jpg`} />

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
