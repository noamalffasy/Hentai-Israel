import ShortenLink from "../components/ShortenLink";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col bg-white [direction:rtl]">
      <div className="mt-8 h-16 w-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-stripe shadow-blue-400/50"></div>
      <div className="lg:max-w-8xl mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-12 md:py-24 lg:px-8 xl:px-12">
        <div className="space-y-10">
          <div className="text-center">
            <h1 className="inline bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-7xl">
              הנטאי.ישראל
            </h1>
            <p className="mt-3 text-xl tracking-tight text-slate-500 md:text-4xl">
              הנטאי כחול לבן
            </p>
          </div>
          <ShortenLink />
        </div>
      </div>
      <div className="mb-8 h-16 w-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-stripe shadow-blue-400/50"></div>
    </main>
  );
}
