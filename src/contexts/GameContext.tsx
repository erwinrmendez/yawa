import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDictionary } from "../hooks/useDictionary";
import { useSolution } from "../hooks/useSolution";

interface IGameContext {
  status: string | null;
  guessList: string[];
  letters: string;
  activeRow: number;
  changeStatus: (newStatus: string) => void;
  addNewGuess: (guess: string) => void;
  handleKeyUp: (e: KeyboardEvent) => void;
}

// game context with initial properties
const GameContext = createContext<IGameContext>({
  status: "playing",
  guessList: [],
  letters: "",
  activeRow: 0,
  changeStatus: () => {},
  addNewGuess: () => {},
  handleKeyUp: () => {},
});

// custom hook to access game context properties
export const useGameContext = () => useContext(GameContext);

// game context provider
const GameProvider = ({ children }: any) => {
  const { solution } = useSolution();
  const { isValid } = useDictionary();
  const [status, setStatus] = useState<string | null>(
    localStorage.getItem("status")
  );
  const [guessList, setGuessList] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState(0);
  const [letters, setLetters] = useState<string>("");

  // setting initial values from local storage
  useEffect(() => {
    const storedGuessList = localStorage.getItem("currentGuesses");
    if (storedGuessList) {
      setGuessList(storedGuessList.split(","));
      setActiveRow(storedGuessList.split(",").length);
    }
  }, []);

  // change status of game (playing, finished)
  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
    localStorage.setItem("status", newStatus);
  };

  // add new guess to list
  const addNewGuess = (guess: string) => {
    let newList = [...guessList, guess];
    setGuessList(newList);
    localStorage.setItem("currentGuesses", newList.toString());
  };

  // handle keyup event for letters, Enter and Backspace keys
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      // if game is "finished", ignore key events
      if (!status || status === "finished") {
        return;
      }

      if (e.key === "Enter") {
        if (letters.length < 5) return;

        submitGuess(letters);
      } else if (e.key === "Backspace") {
        setLetters(letters.slice(0, -1));
      } else if (/[a-z]/.test(e.key) && letters.length < 5) {
        setLetters(letters + e.key.toLowerCase());
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [letters]
  );

  // submit and validate guess word
  const submitGuess = (guess: string) => {
    if (!isValid(guess)) {
      console.log("Word not valid!");
      return;
    }

    if (guessList.includes(guess)) {
      console.log("You already tried with this one");
      return;
    }

    if (guess === solution) {
      changeStatus("finished");
      console.log("You got it right");
    }

    setActiveRow(activeRow + 1);
    setLetters("");
    addNewGuess(letters);
  };

  // set provided values object for the context
  const provided: IGameContext = {
    status,
    guessList,
    letters,
    activeRow,
    changeStatus,
    addNewGuess,
    handleKeyUp,
  };

  return (
    <GameContext.Provider value={provided}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
