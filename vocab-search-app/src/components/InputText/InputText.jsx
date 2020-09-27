import React from 'react';
import './InputText.scss';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class InputText extends React.Component {
    constructor() {
        super()
        this.state = {text: ""};
    }

    render() {
        return (
            <div className="InputText">
                <div>Enter text: </div>
                <div className="upper-flex">
                    <textarea className="big-textbox"
                        value = {this.state.text}
                        onChange = { event => this.setState({ text: event.target.value }) }></textarea>
                    <FontAwesomeIcon icon={faSearch} onClick={_ => this.props.submitSearch(this.state.text)} />
                </div>
            </div>
        );
    }
}

export default InputText;