import React from 'react';
import './InputText.css';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class InputText extends React.Component {
    render() {
        return (
            <div className="InputText">
                <div>Enter text: </div>
                <div className="upper-flex">
                    <textarea className="big-textbox"></textarea>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        );
    }
}

export default InputText;