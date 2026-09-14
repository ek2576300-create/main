export function Placeholder({ title }) {
  return (
    <main className="px-3 pb-16 pt-4 min-[380px]:px-4 sm:px-5 sm:pt-6 lg:ml-[190px] lg:px-[28px]">
      <h1 className="text-[27px] min-[390px]:text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-[#777]">Раздел подготовлен под дальнейшее подключение.</p>
    </main>
  );
}
