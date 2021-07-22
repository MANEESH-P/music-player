import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playSong, togglePlaying, deleteSong, setActiveSong } from '../redux/actions';
import { AiFillDelete } from 'react-icons/ai'
import useGetSongDetails from '../utils/useGetSongDetails'


const Song = ({ song, songIndex }) => {
  const { songDetails } = useGetSongDetails(song);

  const { songId: currentSongId } = useSelector(state => state.player)
  const { songs } = useSelector(state => state)
  const { playing } = useSelector(state => state.player);

  const dispatch = useDispatch();

  const audioPlayer = document.getElementById('player')

  const handleClick = (songId) => {
    dispatch(playSong(songId))
  }

  const handlePlayNext = (songId) => {
    if (songId !== undefined) {
      dispatch(playSong((songId + 1) % songs.length))
    }
  }

  const changeActiveSong = (songId) => {
    let nextIndex
    if (songId !== undefined) {
      if (songId === currentSongId) {
        nextIndex = songs[songId] ? songId : (currentSongId + 1) % songs.length
        dispatch(setActiveSong(nextIndex))
      } else if (songId < currentSongId) {
        nextIndex = (currentSongId - 1) % songs.length
        dispatch(setActiveSong(nextIndex))
      } else {
        nextIndex = (currentSongId) % songs.length
        dispatch(setActiveSong(nextIndex))
      }
    }
  }

  const handleDelete = (e, songId) => {
    if (playing) {
      dispatch(playSong(songId))
    } else {
      changeActiveSong(songId)
    }
    dispatch(deleteSong(songId))

    audioPlayer.removeAttribute('src')

    e.stopPropagation();
  }

  return (
    <div className={`music-player__song ${songIndex === currentSongId ? 'music-player__song--active' : ''}`} style={{ transitionDelay: `${songIndex * 0.075}s` }} onClick={() => handleClick(songIndex)}>
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
          <div onClick={(e) => handleDelete(e, songIndex)}>
            <AiFillDelete size={22} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Song
