export default function GameRow({
  currentGuess,
  correctWord,
  submittedRow,
  currentRow,
}: {
  currentGuess: string;
  correctWord: string;
  submittedRow: boolean;
  currentRow?: boolean;
}) {
  const displayLetters = Array.from(
    { length: 5 },
    (_, i) => currentGuess[i] || ""
  );

  const baseStyle =
    "border border-gray-700 h-15 w-15 md:h-20 md:w-20 flex items-center justify-center text-4xl uppercase font-black";

  const statusStyles = {
    correct: "bg-green-400 text-background",
    present: "bg-yellow-400 text-background",
    absent: "bg-gray-400 text-background",
    default: "bg-transparent text-foreground",
  };

  const currentRowStyles = "border-white";

  function getLetterStatus(letter: string, index: number) {
    if (!submittedRow) {
      return "default";
    }

    const statuses: ("correct" | "present" | "absent")[] = Array(
      displayLetters.length
    ).fill("absent");

    const correctLettersArray = correctWord.split("");
    const guessLettersArray = currentGuess.split("");

    const availableCorrectLetters = [...correctLettersArray];

    for (let i = 0; i < displayLetters.length; i++) {
      if (guessLettersArray[i] === availableCorrectLetters[i]) {
        statuses[i] = "correct";
        availableCorrectLetters[i] = "";
      }
    }

    for (let i = 0; i < displayLetters.length; i++) {
      if (statuses[i] === "correct") {
        continue;
      }

      const currentGuessedLetter = guessLettersArray[i];
      const indexOfPresent =
        availableCorrectLetters.indexOf(currentGuessedLetter);

      if (indexOfPresent !== -1) {
        statuses[i] = "present";
        availableCorrectLetters[indexOfPresent] = "";
      }
    }

    return statuses[index];
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {displayLetters.map((letter, index) => {
        const letterStatus = getLetterStatus(letter, index);
        const extraStyle = statusStyles[letterStatus];
        return (
          <div
            key={index}
            className={`${baseStyle} ${extraStyle} ${
              currentRow && currentRowStyles
            }`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
