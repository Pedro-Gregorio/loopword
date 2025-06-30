import { generate } from "random-words";

export default function GameZone() {
  const randomWord = generate({ exactly: 1, minLength: 5, maxLength: 5 });

  return <></>
}