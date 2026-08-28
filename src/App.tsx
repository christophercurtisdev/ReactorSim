import './App.css'
import GameComponent from './Components/GameComponent';
import GameDebugComponent from './Components/Debug/GameDebugComponent';
import TickDebugComponent from './Components/Debug/TickDebugComponent';

function App() {

  return (
    <div className='flex w-screen h-screen'>
      {/* <TickDebugComponent /> */}
      <GameDebugComponent />
      <GameComponent />
    </div>
  );
}

export default App