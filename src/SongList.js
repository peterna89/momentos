import React from 'react';

class SongList extends React.Component{

    render(){

        let songJSX = [];

        if(this.props.data){
            songJSX = this.props.data.tracks.items.map((value,index) => {
                if(index <= 4){
                    return <div key={index}>
                            <p>{value.name}-{value.artists[0].name}</p>
                            <span><button className='btn btn-light play' onClick={()=>this.props.currentSong(value)}><i className="pt-1 material-icons" >play_arrow</i></button></span>
                            </div>
                }
            })
        }

        return(
            <div>
                <p>Song Detail</p>
                {songJSX}
            </div>
        )
    }
}

export default SongList;