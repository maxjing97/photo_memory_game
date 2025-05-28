import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import Sample from './pages/test';

function App() {
  return (
   <>
    <Navbar/>
      <div>
    <Routes>        
      <Route path="/"  element={<Sample/>} />
      <Route path="/favourites"  element={<Sample />}/>
      <Route path="/cart"  element={<Sample/>}/>
    </Routes>
    </div>
    </>
   
  );
}

export default App;