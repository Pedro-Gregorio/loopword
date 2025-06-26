export default function GameRow({ guess }: { guess: string }) {
  const displayLetters = Array.from({ length: 5 }, (_, i) => guess[i] || "");

  return (
    <div className="grid grid-cols-5 gap-4">
      {displayLetters.map((letter, index) => (
        <div
          key={index}
          className="border h-24 w-24 flex items-center justify-center text-4xl uppercase font-black"
        >
          {letter}
        </div>
      ))}
    </div>
  );
}
