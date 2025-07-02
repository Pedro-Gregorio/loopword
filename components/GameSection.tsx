"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";
import { generate } from "random-words";
import { ROWS } from "@/constants/letters";
import { getExtraStyles } from "@/utils/letters";

export default function GameSection() {
  const [secretWord, setSecretWord] = useState<string>(() =>
    generate({ exactly: 1, minLength: 5, maxLength: 5 })[0].toLowerCase()
  );
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [pastGuesses, setPastGuesses] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const MAX_GUESSES = 6;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    const filteredValue = inputValue.replace(/[^a-zA-Z]/g, "");
    setCurrentGuess(filteredValue);
  }

  function validateWord(e?: FormEvent) {
    if (e) e.preventDefault();

    if (currentGuess.length !== 5) return;

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

  return (
    <section className="mt-6 mx-auto max-w-4xl">
      <form
        className="mt-4 relative"
        onSubmit={(e: FormEvent<HTMLFormElement>) => validateWord(e)}
      >
        <input
          id="guess"
          autoFocus
          ref={inputRef}
          className="max-md:hidden w-full md:h-130 absolute top-0 right-0 opacity-0 cursor-default"
          minLength={5}
          maxLength={5}
          required
          tabIndex={0}
          pattern="^[a-zA-Z]*$"
          onChange={handleInputChange}
          value={currentGuess}
          disabled={gameOver || gameWon}
          type="text"
          autoComplete="off"
        />
        <div className="space-y-2 flex flex-col items-center">
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
        <div className="mt-4 max-w-fit mx-auto flex flex-col space-y-2">
          {ROWS.map((row) => (
            <div
              key={row[0]}
              className="flex items-center justify-center gap-2"
            >
              {row.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className={`cursor-pointer rounded p-2 text-sm md:text-base md:p-4 font-bold uppercase ${getExtraStyles(
                    letter,
                    pastGuesses,
                    secretWord
                  )} hover:scale-105 transition ease-in duration-200`}
                  onClick={() => {
                    if (letter === "delete") {
                      if (currentGuess !== "") {
                        setCurrentGuess((prevGuess) => {
                          return prevGuess.substring(0, prevGuess.length - 1);
                        });
                      }
                    } else if (letter === "enter") {
                      validateWord();
                    } else {
                      if (currentGuess.length < 6) {
                        setCurrentGuess((prevGuess) => {
                          return prevGuess.concat(letter);
                        });
                      }
                    }
                    inputRef.current!.focus();
                  }}
                >
                  {letter}
                </button>
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
