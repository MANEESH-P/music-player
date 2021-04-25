import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlaying } from '../redux/actions';
import useGetSongDetails from '../utils/useGetSongDetails'


const Song = ({ song, songIndex }) => {
  const { songDetails } = useGetSongDetails(song);
  const { songId : currentSongId } = useSelector(state => state.player)
  const dispatch = useDispatch();
  const handleClick = (songId) => {
    dispatch(playSong(songId))
  }
  return (
    <div class={`music-player__song ${songIndex === currentSongId ? 'music-player__song--active': ''}`}style={{ transitionDelay: '0s' }} onClick={() => handleClick(songIndex)}>
      <div class="song__details">
        <div class="song__details--left">
          <div class="song__cover-image" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>
          <div class="song__meta">
            <div class="song__title">
              <h4>{song.name}</h4>
            </div>
            <div class="song__artist">
              <p>{songDetails?.artist ? songDetails?.artist : 'Unknown Artist'}</p>
            </div>
          </div>
        </div>
        <div class="song__details--right">
          <p>3:45</p>
        </div>
      </div>
    </div>
  )
}

export default Song
