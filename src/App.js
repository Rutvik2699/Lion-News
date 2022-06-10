import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
//import NewsItems from './components/NewsItems';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";


export default class App extends Component {
  pageSize=15;
  apiKey="89ce4ce085e74f77b6b60e4ef4c62863" //process.env.REACT_APP_NEWS_API 
  state={
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>

        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology"/></Route>
        </Switch>

       {/*} <News setProgress={setProgress} Items/>*/}
       </ Router>
      </div>
    )
  }
}
