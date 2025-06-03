import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import Main from './pages/main';
import Stats from './pages/stats';
import About from './pages/about';
import Images from './pages/images';

function App() {
  return (
   <>
    <Navbar/>
      <div>
    <Routes>        {/*defining routes */}
      {/*default route */}
      <Route path="/"  element={<Main/>} />
      <Route path="/stats"  element={<Stats />}/>
      <Route path="/about"  element={<About />}/>
      {/*defining routes within the main page*/}

      <Route path="/1-3select"  element={<Images time="0.33"/>}/>
      <Route path="/1select"  element={<Images time="1"/>}/>
      <Route path="/3select"  element={<Images time="3"/>}/>
    </Routes>
    </div>
    </>
  );
}

export default App;