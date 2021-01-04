import React from 'react';
import InputText from './components/InputText/InputText';
import SearchedText from './components/SearchedText/SearchedText';
import './App.scss';
import axios from "axios";

class App extends React.Component {
	constructor() {
		super();
		this.state = { searched: false, searchedText: "" };
		this.search = this.search.bind(this)
	}

	search(text) {
		if (text === "")
			text = "Oops! Looks like no text was input. Would you like to search again?";
		else {
			this.tracauSearch(text);
		}

		this.setState(state => ({
			searched: !state.searched,
			searchedText: text
		}));
	}

	tracauSearch(text) {
		axios.get("https://api.tracau.vn/" + tracau_API_key + "/s/" + text + "/vi").then(result => {
			if (result.data.tratu.length > 0) {
				const tracauData = result.data.tratu[0].fields.fulltext;

				const engDefStart = tracauData.indexOf('<article id="dict_vv" data-tab-name="Việt - Anh"');
				var defnTab = tracauData.slice(engDefStart);
				const engDefEnd = defnTab.indexOf('</article>');
				defnTab = defnTab.slice(0, engDefEnd);

				const defnsStartTag = '<table id="definition_T_ve_id" border="0">';
				const defnsStart = defnTab.indexOf(defnsStartTag) + defnsStartTag.length;
				var defns = defnTab.slice(defnsStart);
				const defnsEnd = defns.indexOf('</table>');
				defns = defns.slice(0, defnsEnd);

				const aDefStartTag = '<td id="I_C"><font color="#999">■</font></td><td id="C_C" colspan="2">';
				const entryList = defns.split(aDefStartTag);
				var defnsList = [];
				entryList.slice(1).forEach(defn => {
					defnsList.push(defn.slice(0, defn.indexOf('</td>')));
				});
				
				defnsList.forEach((defn, i) => console.log('(' + (i + 1) + '): ' + defn))
			}
			else {
				console.log("no results found for this search");
			}
		});
	}

	render() {
		return this.state.searched ? (
			<div className="App">
				<SearchedText text={this.state.searchedText}
					returnToSearch={_ => this.search("")}>
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

const tracau_API_key = "WBBcwnwQpV89";

export default App;
