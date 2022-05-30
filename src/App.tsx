import Grid from "./components/Grid";

const App = () => {
  return (
    <div className="flex flex-col items-center h-screen text-white bg-gray-900">
      <header className="w-full p-4 text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold">YAWA</h1>
        <div className="opacity-60">Yet Another Wordle App</div>
      </header>
      <Grid attempts={6} />
    </div>
  );
};

export default App;
