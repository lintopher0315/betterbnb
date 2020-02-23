import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
//import logo from './logo.svg';
import './App.css';

// import components
import Landing from './components/landing.component'
import Footer from './components/footer.component'
import Header from './components/header.component'
import Settings from './components/settings.component'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/settings" component={Settings} />
          <Route component={Landing} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
