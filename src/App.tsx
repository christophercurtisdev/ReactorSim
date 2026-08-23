import './App.css'
import GameComponent from './Components/GameComponent';
import TickDebugComponent from './Components/TickDebugComponent';

function App() {

  return (
    <div className='flex w-screen h-screen'>
      <TickDebugComponent />
      <GameComponent />
    </div>
  );
}

export default App