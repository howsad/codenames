import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Container from './components/Game/container.js';
import CreateGame from './components/CreateGame/createGame.js';

function App() {

  return (
    <div className="App">
			<Router>
				<Switch>
					<Route path={`/:id`}>
						<Container />
					</Route>
					<Route path="/">
						<CreateGame />
					</Route>
				</Switch>
			</Router>
    </div>
  );
}

export default App;
