import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom'

import Header from './Header';
import FuncNav from './FuncNav';
import RouterView from './RouterView';

import "../styles/main.css";

class App extends Component {
  render() {
    return (
      <div className="main">
        <HashRouter>
          <div className="container">
            <Header/>
            <div className="app-wrapper">
              <FuncNav/>
              <RouterView/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }

  plus = () => {
  	this.props.dispatch({
  		type:'PLUS'
  	})
  }

  minus = () => {
  	this.props.dispatch({
  		type:'MINUS'
  	})
  }
}

export default connect((store) => {
	return {
		number:(store && store.number) ? store.number : 0
	}
})(App);
