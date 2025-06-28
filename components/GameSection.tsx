"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";

export default function GameSection({ word }: { word: string }) {
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

    if (currentGuess === word) {
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
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameWon]);

  return (
    <section className="mt-6 mx-auto max-w-4xl">
      <form
        className="mt-4 relative"
        onSubmit={(e: FormEvent<HTMLFormElement>) => validateWord(e)}
      >
        <input
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
              correctWord={word}
              submittedRow={true}
            />
          ))}
          {/* Current Guess */}
          {!(gameOver || gameWon) && (
            <GameRow
              key={pastGuesses.length}
              currentGuess={currentGuess}
              correctWord={word}
              submittedRow={false}
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
                correctWord={word}
                submittedRow={false}
              />
            );
          })}
        </div>
      </form>

      {(gameOver || gameWon) && (
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold">
            {gameWon
              ? "You found the right word! 🥳"
              : `Game Over! The word was ${word.toUpperCase()} 😢`}
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
