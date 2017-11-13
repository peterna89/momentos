/* global webkitSpeechRecognition */
import React from 'react';
import './ListenButton.css'
import axios from 'axios';

class ListenButton extends React.Component{

    constructor(props){
        super(props);
        this.recognition;

        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount(){
        
        if(!('webkitSpeechRecognition' in window)){
            console.log('Not supported');
        }else{
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            this.recognition.maxAlternatives = 1;
        }
    
        this.recognition.onstart = () => {
            console.log('Listening');
        }

        this.recognition.onend = ()=> {
            console.log('Not listening');
        }

        this.recognition.onresult = (event) => {
            if(typeof(event.results) === 'undefined'){
            this.recognition.stop();
            return
            }

            for(let i = event.resultIndex; i < event.results.length; i++){

                if(event.results[i].isFinal){

                    let word = event.results[i][0].transcript;
                    let data = '';
                    console.log('Final: ' + event.results[i][0].transcript);
                    let url = 'https://api.spotify.com/v1/search?q=' + word + '&type=track,artist';
                    
                        axios.get(url, {
                            headers: {
                            Accept: "application/json",
                            Authorization: "Bearer BQDGbP0r-1vy1KowOG74HHFP6loswEV7A-Xgaocc7o_jzK0_RHcrvu3SMZerCFq36TeHIqoDwHm6HeOKA3WXTBZh4Kr-S-A8Kd0QmgWmRnm4MuZVG-rRI_SIb8AKfwlMyjy7aRGMZLubUPI"
                            }
                        }).then( value => {
                            data = value.data;
                            this.props.setWordData(word, data);
                            console.log(value.data);
                        }).catch(error => {
                            console.log(error);
                        })

                }else{
                    
                }
            }
        }
        
    }

    clickHandler(e){
    this.recognition.start();
    }

    render(){
        return(
            <button onClick={this.clickHandler}>Listen</button>
        )
    }
}

export default ListenButton;