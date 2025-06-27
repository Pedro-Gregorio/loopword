export default function GameRow({
  currentGuess,
  correctWord,
  submittedRow,
}: {
  currentGuess: string;
  correctWord: string;
  submittedRow: boolean;
}) {
  const displayLetters = Array.from(
    { length: 5 },
    (_, i) => currentGuess[i] || ""
  );
  const correctLetters = correctWord.split("");
  console.log(correctLetters);

  const baseStyle =
    "border h-24 w-24 flex items-center justify-center text-4xl uppercase font-black";
  const statusStyles = {
    correct: "bg-green-400 text-background",
    present: "bg-yellow-400 text-background",
    absent: "bg-gray-400 text-background",
    default: "bg-transparent text-foreground",
  };

  function getLetterStatus(letter: string, index: number) {
    if (!submittedRow) {
      return "default";
    }

    if (letter === correctLetters[index]) {
      return "correct";
    }

    if (correctLetters.includes(letter)) {
      return "present";
    }

    return "absent";
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {displayLetters.map((letter, index) => {
        const letterStatus = getLetterStatus(letter, index);
        const extraStyle = statusStyles[letterStatus];
        return (
          <div key={index} className={`${baseStyle} ${extraStyle}`}>
            {letter}
          </div>
        );
      })}
    </div>
  );
}
