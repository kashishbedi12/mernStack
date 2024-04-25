import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './comopnents/home/Home';
import Login from './comopnents/login/Login';
import Text from './comopnents/text/Text';
import Audio from './comopnents/audio/Audio';
import Nearby from './comopnents/nearby/Nearby'
import Video from './comopnents/video/Video'
import PrivateRoute from './comopnents/privateroute/PrivateRoute'

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>

        <Route element={<PrivateRoute />} >
        <Route path='/home' element={<Home  />} />
        <Route path='/text' element={<Text />} />
        <Route path='/audio' element={<Audio  />} />
        <Route path='/nearby' element={<Nearby  />} />
        <Route path='/video' element={<Video />} />
        </Route>

        <Route path='/' element={<Login />} />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
