import React, { Component } from 'react';
import { SentenceBuilder } from './SentenceBuilder';
import '../../App.css';
import { ButtonCSS } from '../Button';

const FULL_SENTENCES = "Full Sentences";
const CONJUGATION = "Conjugation";
const VOCAB = "Vocab";

export class SentenceCardComponent extends Component {

  constructor(props) {
    super(props);

    this.dictionary = props.dictionary;
    this.sentenceBuilder = new SentenceBuilder(this.props.dictionary);
    this.textInput = React.createRef();
    const firstSentence = this.sentenceBuilder.makeSentence();
    this.state = {
      eng: firstSentence.eng,
      kor: firstSentence.kor,
      practiceMode: FULL_SENTENCES,
      allowInput: true,
      showKorean: false
    };
  }

  getNextItem = (practiceMode) => {
    switch (practiceMode) {
      case FULL_SENTENCES:
        return this.sentenceBuilder.makeSentence();
      case CONJUGATION:
        return this.sentenceBuilder.makeConjugation();
      case VOCAB:
        return this.sentenceBuilder.makeVocabWord();
      default:
        return {
          eng: 'Something went wrong',
          kor: '아아아아아아아아아'
        }
    }
  }

  onShowAnswerClick = () => {
    this.setState({
      showKorean: true
    });
  }

  onNextButtonClick = () => {
    const nextItem = this.getNextItem(this.state.practiceMode);
    //this.textInput.current.focus();
    this.setState({
      eng: nextItem.eng,
      kor: nextItem.kor,
      showKorean: false
    });
  }

  onPracticeModeChange = (event) => {
    const nextItem = this.getNextItem(event.target.value);
    this.setState({
      practiceMode: event.target.value,
      showKorean: false,
      allowInput: true,
      eng: nextItem.eng,
      kor: nextItem.kor
    });
  }

  render() {
    return (
      <div className="center-container" style={this.props.show ? {} : { display: 'none' }}>
        <div className="practice-mode">
          <select className="selectCSS" onChange={this.onPracticeModeChange} value={this.state.practiceMode} name="practiceModeDropdown">
            <option value={FULL_SENTENCES}>Practice Complete Sentences</option>
            <option value={CONJUGATION}>Practice Conjugation</option>
            <option value={VOCAB}>Practice Vocab</option>
          </select>
        </div>
        <div className="card">
          <p>{this.state.eng}</p>
          {this.state.showKorean ?
            <p>{this.state.kor}</p> :
            <p><ButtonCSS onClick={this.onShowAnswerClick}>Show answer</ButtonCSS></p>
          }
          <div className="next-button-container">
            <ButtonCSS onClick={this.onNextButtonClick}>Next</ButtonCSS>
          </div>
        </div>
      </div>
    );
  }
}