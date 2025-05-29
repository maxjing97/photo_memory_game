import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import Main from './pages/main';
import Stats from './pages/stats';


function App() {
  return (
   <>
    <Navbar/>
      <div>
    <Routes>        
      <Route path="/main"  element={<Main/>} />
      <Route path="/stats"  element={<Stats />}/>
    </Routes>
    </div>
    </>
  );
}

export default App;