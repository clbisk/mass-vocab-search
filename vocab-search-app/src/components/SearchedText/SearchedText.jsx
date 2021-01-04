import React from 'react';
import TracauShoutout from '../TracauShoutout/TracauShoutout';
import '../../App.scss';
import './SearchedText.scss';

class SearchedText extends React.Component {
    render() {
        return (
            <div className="SearchedText">
                <div className="text-display">
                    <div className="vertical-centered">{this.props.text}</div>
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

export default SearchedText;