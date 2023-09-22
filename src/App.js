import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Dashboard from './pages/DashBoard';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <div className=" w-full h-screen overflow-auto">
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
