"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";

export default function GameSection({ word }: { word: string }) {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameWon, setGameWon] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateWord(e: FormEvent) {
    e.preventDefault();

    if (currentGuess === word) {
      setGameWon(true);
    }
  }

  function resetGame() {
    setCurrentGuess("");
    setGameWon(false);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameWon]);

  return (
    <section className="mt-12 mx-auto max-w-4xl">
      <form
        className="relative"
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
          type="text"
        />
        <GameRow guess={currentGuess} />
      </form>

      {gameWon && (
        <div className="mt-12 text-center">
          <h2 className="text-xl font-bold">You found the right word! 🥳</h2>
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
