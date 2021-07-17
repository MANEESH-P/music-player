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
      <div className="song__cover--wrapper">
        <div className="song__cover" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
        {/* <div className="song__actions">
          <i className="fas fa-random"></i>
          <i className="fas fa-redo"></i>
        </div> */}
      </div>
      <div className="footer__drawer-icon" id="popup" onClick={() => setFooterExpanded(!footerExpanded)}>
        <i className="fas fa-angle-up"></i>
      </div>
      <div className="footer--topbar">
        <div className="footer--details">
          <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
        </div>

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
