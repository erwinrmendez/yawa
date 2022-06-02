import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import GameProvider from "./contexts/GameContext";
import NotificationProvider from "./contexts/NotificationContext";

const App = () => {
  return (
    <NotificationProvider>
      <GameProvider>
        <div className="flex flex-col items-center min-h-screen text-white bg-gray-900">
          <header className="w-full p-2 text-center border-b border-gray-700">
            <h1 className="text-3xl font-bold">YAWA</h1>
            <div className="text-sm opacity-60">Yet Another Wordle App</div>
          </header>
          <Grid />
          <Keyboard />
        </div>
      </GameProvider>
    </NotificationProvider>
  );
};

export default App;
