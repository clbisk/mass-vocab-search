import React from 'react';
import InputText from './components/InputText/InputText';
import SearchedText from './components/SearchedText/SearchedText';
import './App.css';

class App extends React.Component {
	constructor() {
		super();
		this.state = { searched: false, searchedText: "" };
		this.search = this.search.bind(this)
	}

	search(text) {
		if (text === "") text = "Oops! Looks like no text was input. Would you like to search again?";
		this.setState(state => ({
			searched: !state.searched,
			searchedText: text
		}));
	}

	render() {
		return this.state.searched ? (
			<div className="App">
				<SearchedText text={this.state.searchedText}
					returnToSearch={this.search}>
				</SearchedText>
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
