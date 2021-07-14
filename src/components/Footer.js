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
    <div class="music-player__footer" id="footer">
      <div class="song__cover--wrapper">
        <div class="song__cover" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
        {/* <div class="song__actions">
          <i class="fas fa-random"></i>
          <i class="fas fa-redo"></i>
        </div> */}
      </div>
      <div class="footer__drawer-icon" id="popup" onClick={() => setFooterExpanded(!footerExpanded)}>
        <i class="fas fa-angle-up"></i>
      </div>
      <div class="footer--topbar">
        <div class="footer--details">
          <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
        </div>

        <div class="footer--controls">
          <i class="fas fa-backward" onClick={() => handlePlayPrev()}></i>
          {playing ?
            <i class="fas fa-pause" onClick={() => handlePause()}></i>
            :
            <i class="fas fa-play" onClick={() => handlePlay()}></i>
          }
          <i class="fas fa-forward" onClick={() => handlePlayNext()}></i>
        </div>
        <div class="song--status">
          <progress id="progress" value={0} max={100} />
        </div>
      </div>
      {footerExpanded &&
        <Visualizer playing={playing} audioPlayer={audioPlayer} />
      }
    </div>
  )
}

export default Footer
