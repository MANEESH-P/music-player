import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useGetSongDetails from "../utils/useGetSongDetails"
import { playSong, togglePlaying } from "../redux/actions"

const Footer = () => {
  const { playing, songId } = useSelector(state => state.player)
  const songs = useSelector(state => state.songs);

  const { songDetails } = useGetSongDetails(songs[songId]);

  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(playSong(songId))
  }
  const handlePause = () => {
    dispatch(togglePlaying())
  }
  const handlePlayNext = () => {
    dispatch(playSong((songId + 1) % songs.length))
  }

  const handlePlayPrev = () => {
    dispatch(playSong((songId > 0
      ? (songId - 1) % songs.length
      : songs.length - 1)))
  }
  return (
    <div class="music-player__footer" id="footer">
      <div class="song__cover--wrapper">
        <div class="song__cover" style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
        <div class="song__actions">
          <i class="fas fa-random"></i>
          <i class="fas fa-redo"></i>
        </div>
      </div>
      <div class="footer__drawer-icon" id="popup">
        <i class="fas fa-angle-up"></i>
      </div>
      <div class="footer--topbar">
        <div class="footer--details">
          <h3>{songs[songId]?.name}</h3>
          <p>{songDetails.artist ? songDetails.artist : ''}</p>
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
    </div>
  )
}

export default Footer
