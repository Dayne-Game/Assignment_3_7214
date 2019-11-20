import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from './pages/Home';
import Post from './pages/Post'
import Dashboard from './components/Dashboard'

import { Provider } from 'react-redux'
import store from './store'

import { loadUser } from './actions/authActions'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route exact path="/" render={props => (
							<Home />
						)} />
					</div>
					<Route path="/Dashboard" component={Dashboard} />
					<Route path="/Post" component={Post} />
					<Route path="/AddPost/:id" component={AddPost} />
					<Route path="/UpdatePost/:id" component={UpdatePost} />
				</Router>
			</Provider>
		);
	}
}

export default App;
