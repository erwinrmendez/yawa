import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDictionary } from "../hooks/useDictionary";
import { useSolution } from "../hooks/useSolution";
import { useNotification } from "./NotificationContext";

interface IGameContext {
  status: string | null;
  guessList: string[];
  letters: string;
  activeRow: number;
  handleKeyUp: (e: KeyboardEvent) => void;
}

// game context with initial properties
const GameContext = createContext<IGameContext | undefined>(undefined);

// custom hook to access game context properties
export const useGameContext = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw Error("Cannot use GameContext outside its provider.");
  }

  return context;
};

// game context provider
const GameProvider = ({ children }: any) => {
  const { solution } = useSolution();
  const { isValid } = useDictionary();
  const { showMessage, hideMessage } = useNotification();

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
        hideMessage();
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
      showMessage("Not in list!");
      return;
    }

    // block repeating same guess word
    if (guessList.includes(guess)) {
      showMessage("You already tried with this one");
      return;
    }

    if (guess === solution) {
      changeStatus("finished");
      showMessage("Yay! You got it right");
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
    handleKeyUp,
  };

  return (
    <GameContext.Provider value={provided}>{children}</GameContext.Provider>
  );
};

export default GameProvider;
