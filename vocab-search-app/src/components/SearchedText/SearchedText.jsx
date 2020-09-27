import React from 'react';
import '../../App.css';
import './SearchedText.scss';

class SearchedText extends React.Component {
    render() {
        return (
            <div className="SearchedText">
                <div className="text-display">
                    <div className="vertical-centered">{this.props.text}</div>
                </div>
                
                <button onClick={this.props.returnToSearch}>Search again</button>
            </div>
        );
    }
}

export default SearchedText;