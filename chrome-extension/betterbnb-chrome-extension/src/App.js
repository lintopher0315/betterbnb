import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import logo from './logo.svg';
import './App.css';

// import components
import Landing from './components/landing.component'
import Footer from './components/footer.component'

function App() {
  return (
    <div>
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
