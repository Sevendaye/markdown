import React, { Component } from 'react';
import './App.css';
import marked from 'marked';
import { sampleText } from './sampleText';

class App extends Component {
  state = {
    text: sampleText
  }

  handleChange = (event) => {
    let text = event.target.value;
    this.setState({ text });
  }

  renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  }

  componentDidMount() {
    const text = localStorage.getItem('text');

    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate() {
    const text = this.state.text;
    localStorage.setItem('text', text);
  }

  render() {
    return (
      <div className="container" >
        <div className="row">
          <div className="col-sm-6">
            <textarea className="form-control" rows='35' value={this.state.text} onChange={this.handleChange}></textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
