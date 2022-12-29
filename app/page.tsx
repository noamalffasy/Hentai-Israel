import ShortenLink from "../components/ShortenLink";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col bg-white [direction:rtl]">
      <div className="mt-8 h-16 w-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-xl shadow-blue-400/50"></div>
      <div className="lg:max-w-8xl mx-auto w-full max-w-2xl flex-1 space-y-10 py-12 px-4 md:space-y-20 md:pt-28 lg:px-8 xl:px-12 xl:pt-52">
        <div className="text-center">
          <p className="inline bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-7xl">
            הנטאי.ישראל
          </p>
          <p className="mt-3 text-xl tracking-tight text-slate-400 md:text-4xl">
            הנטאי כחול לבן
          </p>
        </div>
        <ShortenLink />
      </div>
      <div className="mb-8 h-16 w-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-xl shadow-blue-400/50"></div>
    </main>
  );
}
