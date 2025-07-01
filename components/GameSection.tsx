"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";
import { generate } from "random-words";
import { QWERTY } from "@/constants/letters";
import { getExtraStyles } from "@/utils/letters";

export default function GameSection() {
  const [secretWord, setSecretWord] = useState<string>(
    () => generate({ exactly: 1, minLength: 5, maxLength: 5 })[0].toLowerCase()
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const MAX_GUESSES = 6;
  const inputRef = useRef<HTMLInputElement>(null);

  function validateWord(e: FormEvent) {
    e.preventDefault();

    if (gameOver || gameWon) return;

    const newPastGuesses = [...pastGuesses, currentGuess];
    setPastGuesses(newPastGuesses);

    if (currentGuess === secretWord) {
      setGameWon(true);
    } else if (newPastGuesses.length >= MAX_GUESSES) {
      setGameOver(true);
    }

    setCurrentGuess("");
  }

  function resetGame() {
    setCurrentGuess("");
    setPastGuesses([]);
    setGameWon(false);
    setGameOver(false);
    setSecretWord(
      () => generate({ exactly: 1, minLength: 5, maxLength: 5 })[0]
    );
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameWon]);

  console.log(pastGuesses)

  return (
    <section className="mt-6 mx-auto max-w-4xl">
      <form
        className="mt-4 relative"
        onSubmit={(e: FormEvent<HTMLFormElement>) => validateWord(e)}
      >
        <input
          autoFocus
          ref={inputRef}
          className="absolute top-0 right-0 w-full h-full opacity-0 cursor-default"
          maxLength={5}
          required
          tabIndex={0}
          pattern="[A-Za-z]*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCurrentGuess(e.currentTarget.value)
          }
          value={currentGuess}
          disabled={gameOver || gameWon}
          type="text"
        />
        <div className="space-y-2">
          {/* Past Guesses */}
          {pastGuesses.map((guess, index) => (
            <GameRow
              key={index}
              currentGuess={guess}
              correctWord={secretWord}
              submittedRow={true}
            />
          ))}
          {/* Current Guess */}
          {!(gameOver || gameWon) && (
            <GameRow
              key={pastGuesses.length}
              currentGuess={currentGuess}
              correctWord={secretWord}
              submittedRow={false}
              currentRow={true}
            />
          )}
          {/* Future Guesses */}
          {Array.from({
            length:
              MAX_GUESSES - pastGuesses.length - (gameWon || gameOver ? 0 : 1),
          }).map((_, index) => {
            return (
              <GameRow
                key={pastGuesses.length + (gameWon || gameOver ? 0 : 1) + index}
                currentGuess={""}
                correctWord={secretWord}
                submittedRow={false}
              />
            );
          })}
        </div>
        <div className="mt-4 max-w-sm mx-auto flex flex-col space-y-2">
          {QWERTY.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2">
              {row.split("").map((letter) => (
                <p
                  key={letter}
                  className={`rounded p-2 text-sm md:text-base md:p-4 font-bold uppercase ${
                    getExtraStyles(letter, pastGuesses, secretWord)
                  }`}
                >
                  {letter}
                </p>
              ))}
            </div>
          ))}
        </div>
      </form>

      {(gameOver || gameWon) && (
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold">
            {gameWon
              ? "You found the right word! 🥳"
              : `Game Over! The word was ${secretWord
                  .toString()
                  .toUpperCase()} 😢`}
          </h2>
          <button
            onClick={resetGame}
            className="cursor-pointer mt-4 border rounded-lg px-2 md:px-4 py-1 md:py-2 hover:bg-foreground/20 transition duration-300 ease-in"
          >
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}
