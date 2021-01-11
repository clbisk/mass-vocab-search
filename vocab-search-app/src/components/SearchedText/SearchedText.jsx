import React from 'react';
import TracauShoutout from '../TracauShoutout/TracauShoutout';
import DefinedWord from '../DefinedWord/DefinedWord';
import '../../App.scss';
import './SearchedText.scss';
import axios from "axios";

class SearchedText extends React.Component {
    search(text) {
		const words = text.split(" ");
			
        var lastWordDefined = -1;
        var definitions = {};

        //TODO: gonna have to make this boi asynchronous yucky yucky
        words.forEach((word, i) => {
            console.log(word, i);

            // if this word was not part of a previous compound word
            if (lastWordDefined === i)
                return;

            // check for compound words first
            const compoundWordDef = (words.length > i + 1)? this.tracauSearch(word + words[i + 1]) : null;
            if (compoundWordDef) {
                definitions[word + words[i + 1]] = compoundWordDef;
                lastWordDefined = i + 1;
                return;
            }

            // not part of a compound word
            const def = this.tracauSearch(word);
            if (def)
                definitions[word] = def;
            // if it could not be defined, we will simply gray out the word
            else
                definitions[word] = null;

            lastWordDefined = i;
        });

        return definitions;
	}

	tracauSearch(text) {
		return axios.get("https://api.tracau.vn/" + tracau_API_key + "/s/" + text + "/vi").then(result => {
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
            
			return defnsList;
		});
	}

    render() {
        var searchResults;
        if (this.props.text !== "") {
            searchResults = this.search(this.props.text);
            console.log(searchResults);
        }

        const mainText = this.props.text === ""?
            (
                <div>"Oops! Looks like no text was input. Would you like to search again?"</div>
            ) : (
                <div className="defined-words">
                    {Object.keys(searchResults).map((word, i) => {
                        const defn = searchResults[word];
                        return <DefinedWord word={word} defn={defn} key={i} />
                    })}
                </div>
            );
            

        return (
            <div className="SearchedText">
                <div className="text-display">
                    <div className="vertical-centered">{mainText}</div>
                </div>
                
                <div className="footer">
                    <div className="submit-search">
                        <button onClick={this.props.returnToSearch}>Search again</button>    
                    </div>
                    <TracauShoutout></TracauShoutout>
                </div>
            </div>
        );
    }
}

const tracau_API_key = "WBBcwnwQpV89";

export default SearchedText;
