import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Dashboard from './pages/DashBoard';
import { Route, HashRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className=" w-full h-screen overflow-auto">
        <Nav />
        <HashRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route exact path="/#/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
