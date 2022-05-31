/**
 * Initializes game using local storage and solutions list
 */

import { useState } from "react";
import { compareAsc, differenceInDays, format, toDate } from "date-fns";

import * as solutionsList from "../assets/words.json";

export const useSolution = () => {
  // get solution from local storage to set state
  const storedSolution = localStorage.getItem("solution");
  const [solution, setSolution] = useState<string>(storedSolution || "");
  const { words } = solutionsList;

  // get stored date from local storage to compare with current date
  const storedDate = localStorage.getItem("date") || "";
  const reference = new Date("05/30/2022");
  const today = toDate(new Date());
  today.setHours(0, 0, 0, 0); // to correctly compare the two dates

  if (
    !storedDate ||
    !solution ||
    compareAsc(today, new Date(storedDate)) === 1
  ) {
    const index = differenceInDays(today, reference);

    let newSolution = words[index];
    setSolution(newSolution);

    // reset all values in local storage
    localStorage.setItem("date", format(today, "MM/dd/yyyy"));
    localStorage.setItem("solution", newSolution);
    localStorage.setItem("status", "playing");
    localStorage.setItem("currentGuesses", "");
  }

  return { solution };
};
