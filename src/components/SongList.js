import React from 'react'
import { useSelector } from 'react-redux';
import Song from './Song';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  return (
    <div class="music-player__song-list" id=
      "songs-container">
      <div class="music-player__song-list--container" >
        {songs.map((song, index)=>{
          return <Song song={song} songIndex={index} key={index}/>
        })}
      </div>
    </div>
  )
}

export default SongList
