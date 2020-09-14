import React from 'react';
import '../../App.css';

class SearchedText extends React.Component {
    render() {
        return (
            <div className="InputText">
                <div>Enter text: </div>
                <div className="upper-flex">
                    <textarea className="big-textbox"></textarea>
                </div>
                <button onClick={this.props.returnToSearch}>Search again</button>
            </div>
        );
    }
}

export default SearchedText;