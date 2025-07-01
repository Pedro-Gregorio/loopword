export function getExtraStyles(
  letter: string,
  guesses: string[],
  correctWord: string
) {
  let isCorrectLetter = false;
  let isUsedLetter = false;
  let isExistingLetter = false;

  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === letter && correctWord[i] === letter) {
        isCorrectLetter = true;
        break;
      }
    }

    if (guess.includes(letter)) {
      if (correctWord.includes(letter)) {
        if (!isCorrectLetter) {
          isExistingLetter = true;
        }
      } else {
        if (!isCorrectLetter && !isUsedLetter) {
          isUsedLetter = true;
        }
      }
    }
  }

  if (isCorrectLetter) {
    return "bg-green-400 text-background";
  }

  if (isExistingLetter) {
    return "bg-yellow-400 text-background";
  }

  if (isUsedLetter) {
    return "bg-red-900";
  }

  return "bg-gray-400 text-background";
}
