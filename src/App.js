import React, { Component } from 'react';
import { Dictionary } from './components/Dictionary';
import { SentenceCardComponent } from './components/Sentence/SentenceCardComponent';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dictionary: undefined,
      showDictionary: false
    }

    Dictionary.create().then((dict) => {
      this.setState({
        dictionary: dict
      });
    });
  }

  render() {
    return (
      <div className="main">
        <h1>한국어 연습</h1>
        {this.state.dictionary &&
          <div className="contents">
            <SentenceCardComponent
              dictionary={this.state.dictionary}
              show={!this.state.showDictionary}
            />
          </div>
        }
      </div>
    );
  }
}

export default App;
