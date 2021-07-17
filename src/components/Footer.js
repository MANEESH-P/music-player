import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useGetSongDetails from "../utils/useGetSongDetails"
import { playSong, togglePlaying } from "../redux/actions"
import Visualizer from './Visualizer';

const Footer = ({ audioPlayer }) => {
  const [footerExpanded, setFooterExpanded] = useState(false);

  const songs = useSelector(state => state.songs);
  const { playing, songId } = useSelector(state => state.player)

  const { songDetails } = useGetSongDetails(songs[songId]);

  const dispatch = useDispatch()

  const handlePlay = () => {
    if (songId !== undefined) {
      dispatch(playSong(songId))
    }
  }
  const handlePause = () => {
    dispatch(togglePlaying())
  }
  const handlePlayNext = () => {
    if (songId !== undefined) {
      dispatch(playSong((songId + 1) % songs.length))
    }
  }

  const handlePlayPrev = () => {
    if (songId !== undefined) {
      dispatch(playSong((songId > 0
        ? (songId - 1) % songs.length
        : songs.length - 1)))
    }
  }

  useEffect(() => {
    let popup = document.getElementById('popup');
    popup.addEventListener('click', function () {
      let songContainer = document.getElementById('songs-container');
      songContainer.classList.toggle('overlay')
      let footer = document.getElementById('footer');
      footer.classList.toggle('expanded')
      let headerButton = document.getElementById('headerButton');
      headerButton.classList.toggle('hidden')
    })
  }, [])

  const noSongsAdded = songs.length === 0;

  return (
    <div className="music-player__footer" id="footer">
      {/* <div className="background-image" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
      </div> */}
      <div className="song-details--wrapper">
        <div className="song-details__cover" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }} >
          {/* {!songDetails?.url &&
            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3l.01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
          } */}
        </div>
        {/* <div className="song__actions">
          <i className="fas fa-random"></i>
          <i className="fas fa-redo"></i>
        </div> */}
        <div className="song-details__meta">
          <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
        </div>
      </div>
      <div className="footer__drawer-icon" id="popup" onClick={() => setFooterExpanded(!footerExpanded)}>
        <i className="fas fa-angle-up"></i>
      </div>
      <div className="footer--topbar">
        <div className="footer--controls">
          <i className="fas fa-backward" onClick={() => handlePlayPrev()}></i>
          {playing ?
            <i className="fas fa-pause" onClick={() => handlePause()}></i>
            :
            <i className="fas fa-play" onClick={() => handlePlay()}></i>
          }
          <i className="fas fa-forward" onClick={() => handlePlayNext()}></i>
        </div>
        <div className="song--status">
          <progress id="progress" value={0} max={100} />
        </div>
      </div>
      {playing &&
        <Visualizer playing={playing} audioPlayer={audioPlayer} />
      }
    </div>
  )
}

export default Footer
