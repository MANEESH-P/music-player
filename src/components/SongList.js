import React from 'react'
import { useSelector } from 'react-redux';
import Song from './Song';

const SongList = () => {
  const songs = useSelector(state => state.songs);
  const noSongsAdded = songs?.length === 0;
  return (
    <div class="music-player__song-list" id=
      "songs-container">
      {noSongsAdded ?
        <div className="music-player__song-list--no-songs">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentcolor">
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <path d="M14,10H3v2h11V10z M14,6H3v2h11V6z M18,14v-4h-2v4h-4v2h4v4h2v-4h4v-2H18z M3,16h7v-2H3V16z" />
            </g>
          </svg>
          <h5>Add your favourite songs to get started!</h5>
        </div>
        :
        <div class="music-player__song-list--container" >
          {songs.map((song, index) => {
            return <Song song={song} songIndex={index} key={index} />
          })}
        </div>
      }
    </div>
  )
}

export default SongList
