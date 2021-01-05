import React from 'react';
import InputText from './components/InputText/InputText';
import SearchedText from './components/SearchedText/SearchedText';
import './App.scss';
import axios from "axios";

class App extends React.Component {
	constructor() {
		super();
		this.state = { searched: false, searchedText: "", searchResults: {} };
		this.search = this.search.bind(this)
	}

	search(text) {
		this.setState(state => ({
			searched: !state.searched,
			searchedText: text
		}));

		if (text === "")
			text = "Oops! Looks like no text was input. Would you like to search again?";
		else {
			const words = text.split(" ");
			
			var lastWordDefined = -1;
			var definitions = {};
			words.forEach((word, i) => {
				// if this word was not part of a previous compound word
				if (lastWordDefined === i)
					return;

				// check for compound words first
				const compoundWordDef = (words.length > i)? this.tracauSearch(word + words[i + 1]) : false;
				if (compoundWordDef) {
					definitions[word + words[i + 1]] = compoundWordDef;
					lastWordDefined = i + 1;
					return;
				}

				// not part of a compound word
				const def = this.tracauSearch(word)
				if (def)
					definitions[word] = def;
				// if it could not be defined, we will simply gray out the word

				lastWordDefined = i;
			});
		}

		this.setState(_ => ({
			searchResults: definitions
		}));
	}

	tracauSearch(text) {
		axios.get("https://api.tracau.vn/" + tracau_API_key + "/s/" + text + "/vi").then(result => {
			if (result.data.tratu.length <= 0)
				return false;

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
			entryList.slice(1).forEach(def => {
				var parsedDef = def.slice(0, def.indexOf('</td>'));

				// check if a similar word's definition was returned
				const seeOtherTag = 'Xem <font color="#1371BB">';
				if (parsedDef.startsWith(seeOtherTag)) {
					const seeOtherEnd = parsedDef.indexOf('</font>')
					parsedDef = "See " + parsedDef.slice(seeOtherTag.length, seeOtherEnd);
				}
				
				defnsList.push(parsedDef);
			});
			
			defnsList.forEach((defn, i) => console.log('(' + (i + 1) + '): ' + defn));
			return defnsList;
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
