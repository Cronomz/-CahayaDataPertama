import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import GameReview from './pages/GameReview/GameReview';

function App() {

  useEffect(()=> {
    
  }, [])

  return (
    <div className="App">
      <GameReview/>
    </div>
  );
}

export default App;
