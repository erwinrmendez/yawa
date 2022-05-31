/**
 * Hook to obtain list of posible guesses to check if an entered word is valid
 *
 * From: https://github.com/tabatkins/wordle-list
 */

import { useEffect, useState } from "react";

export const useDictionary = () => {
  const [validWords, setValidWords] = useState<string[]>([]);

  // set state after render
  useEffect(() => {
    const words = localStorage.getItem("words");
    if (words) {
      setValidWords(JSON.parse(words));
      return;
    }

    fetch("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words")
      .then((response) => response.text())
      .then((data) => {
        const words = data.split("\n");
        localStorage.setItem("words", JSON.stringify(words));
        setValidWords(words);
      });
  }, []);

  // validate given word against fetched list of valid five letter words
  const isValid = (word: string) => {
    return validWords.includes(word);
  };

  return { validWords, isValid };
};
