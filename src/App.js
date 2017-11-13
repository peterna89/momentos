/* global webkitSpeechRecognition */
import React, { Component } from 'react';
import './App.css';
import ListenButton from './ListenButton';
import SongList from './SongList'
import AudioPlayer from './AudioPlayer';

class App extends Component {

  constructor(){
    super();

    this.state = {
      word: '',
      data: '',
      currentSong: ''
    }

    this.setWordData = this.setWordData.bind(this);
    this.currentSong = this.currentSong.bind(this);

  }

  setWordData(word, data){

    this.setState({
      word: word,
      data : data
    })

  }

  currentSong(src){
    this.setState({
      currentSong : src
    })
  }


  render() {

    return (
      <div className="App">
        <ListenButton setWord={this.setWord} setWordData={this.setWordData}/>
        <SongList data={this.state.data} currentSong={this.currentSong}/>
        <AudioPlayer currentSong={this.state.currentSong} data={this.state.data}/>
      </div>
    );
  }
}

export default App;
