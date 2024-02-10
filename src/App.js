// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
import Chatroom from './components/Chatroom';

const App = () => {
  return (
    <Router>
      <div>
        {/* Use Switch to render the first Route that matches */}
        <Routes>
          <Route path="/" element={<Chatroom/>} />
          {/* <Route path="/chat" component={Chatroom} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
