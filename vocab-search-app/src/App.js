import React from 'react';
import InputText from './components/InputText/InputText';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <InputText></InputText>
        </header>
      </div>
    );
  }
}

export default App;
