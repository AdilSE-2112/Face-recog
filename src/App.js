import logo from './logo.svg';
import './App.css';

import Home from './pages/home';
import AuthProvider from './context/authContext';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SearchProvider from './context/searchContext';
import Result from './pages/result';
import Login from './components/login/login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/search/result' element={<Result />} />
            </Routes>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
