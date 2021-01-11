import React from 'react';
import InputText from './components/InputText/InputText';
import SearchedText from './components/SearchedText/SearchedText';
import './App.scss';

class App extends React.Component {
	constructor() {
		super();
		this.state = { searched: false, searchedText: "" };
		this.toggleSearch = this.toggleSearch.bind(this)
	}

	toggleSearch(text) {
		this.setState(state => ({
			searched: !state.searched,
			searchedText: text
		}));
	}

	render() {
		return this.state.searched ? (
			<div className="App">
				<SearchedText text={this.state.searchedText}
					returnToSearch={_ => this.toggleSearch("")}>
				</SearchedText>
			</div>
		) : (
			<div className="App">
				<header className="App-header">
					<InputText submitSearch={this.toggleSearch}></InputText>
				</header>
			</div>
		);
	}
}

export default App;
