import './App.css';
import { Route,Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import Main from './pages/main';
import Stats from './pages/stats';
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
      {/*defining routes within the main page*/}

      <Route path="/5select"  element={<Images time="5"/>}/>
      <Route path="/30select"  element={<Images time="30"/>}/>
    </Routes>
    </div>
    </>
  );
}

export default App;