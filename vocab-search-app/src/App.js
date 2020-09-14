import React from 'react';
import InputText from './components/InputText/InputText';
import SearchedText from './components/SearchedText/SearchedText';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = {searched: false};
	}

	search() {
		console.log(this);
		this.setState(state => ({
			searched: !state.searched
		}));
	}

	render() {
		return this.state.searched? (
			<div className="App">
				<header className="App-header">
					<SearchedText returnToSearch={this.search}></SearchedText>
				</header>
			</div>
		) : (
			<div className="App">
				<header className="App-header">
					<InputText submitSearch={this.search}></InputText>
				</header>
			</div>
		);
	}
}

export default App;
