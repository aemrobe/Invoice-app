"use client";

function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>

      <button className="inline-blcok py-3 px-y text-lg" onClick={reset}>
        Try again
      </button>
    </main>
  );
}

export default Error;
