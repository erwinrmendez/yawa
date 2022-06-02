import { KEYS } from "../utils/constants";
import Key from "./Key";

const Keyboard = () => {
  return (
    <div className="flex flex-col w-full max-w-[500px] gap-1.5 mt-4 select-none">
      <div className="flex justify-center gap-1.5">
        {KEYS.slice(0, 10).map((value) => (
          <Key key={value} keyValue={value} />
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        <span className="flex-[0.5]"></span>
        {KEYS.slice(10, 19).map((value) => (
          <Key key={value} keyValue={value} />
        ))}
        <span className="flex-[0.5]"></span>
      </div>
      <div className="flex justify-center gap-1.5">
        <Key keyValue="Enter" flex="flex-[1.63]" />
        {KEYS.slice(19, 26).map((value) => (
          <Key key={value} keyValue={value} />
        ))}
        <Key keyValue="Backspace" flex="flex-[1.63]" />
      </div>
    </div>
  );
};

export default Keyboard;
