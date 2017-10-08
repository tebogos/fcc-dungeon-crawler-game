
import React, { Component } from 'react';
import './App.scss';
import Board from './Board';
import Info from './Info';

class App extends Component {

  render() {
    return (
      <div className="app-container">
       <Info />
       <div className="view-box">
          <Board/>
       </div>

      </div>
    );
  }

}

export default App;
