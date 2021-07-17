import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlaying } from '../redux/actions';
import useGetSongDetails from '../utils/useGetSongDetails'


const Song = ({ song, songIndex }) => {
  const { songDetails } = useGetSongDetails(song);
  const { songId: currentSongId } = useSelector(state => state.player)
  const dispatch = useDispatch();
  const handleClick = (songId) => {
    dispatch(playSong(songId))
  }
  return (
    <div className={`music-player__song ${songIndex === currentSongId ? 'music-player__song--active' : ''}`} style={{ transitionDelay: '0s' }} onClick={() => handleClick(songIndex)}>
      <div className="song__details">
        <div className="song__details--left">
          <div className="song-details__cover-image" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {!songDetails?.url &&
              <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3l.01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
            }
          </div>
          <div className="song__meta">
            <div className="song__title">
              <h4>{song.name}</h4>
            </div>
            <div className="song__artist">
              <p>{songDetails?.artist ? songDetails?.artist : 'Unknown Artist'}</p>
            </div>
          </div>
        </div>
        <div className="song__details--right">
          <p>{songDetails?.duration}</p>
        </div>
      </div>
    </div>
  )
}

export default Song
