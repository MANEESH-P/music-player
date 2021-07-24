import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useGetSongDetails from "../utils/useGetSongDetails"
import { playSong, togglePlaying, setNowPlayingView } from "../redux/actions"
import { BsFillSkipForwardFill } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';
import { GrPlayFill, GrPauseFill } from 'react-icons/gr';

const Footer = ({ audioPlayer, currentTime }) => {
  const [footerExpanded, setFooterExpanded] = useState(false);

  const songs = useSelector(state => state.songs);
  const { playing, songId, nowPlayingView } = useSelector(state => state.player)

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

  const changeProgress = () => {
    const progressBar = document.getElementById('slider');
    if (audioPlayer) {
      audioPlayer.currentTime = progressBar.value;
    }
  };

  useEffect(() => {
    // let popup = document.getElementById('popup');
    // const progressBar = document.getElementById('slider');
    // progressBar.value = 0;
    // popup.addEventListener('click', function () {
    //   let songContainer = document.getElementById('songs-container');
    //   songContainer.classList.toggle('overlay')
    //   let footer = document.getElementById('footer');
    //   footer.classList.toggle('expanded')
    //   let headerButton = document.getElementById('headerButton');
    //   headerButton.classList.toggle('hidden')
    // })
  }, [])

  const noSongsAdded = songs.length === 0;
  return (
    <div className={`music-player__footer ${nowPlayingView ? 'music-player__footer--hidden' : ''}`} id="footer">
      <div className="song-details--wrapper">
        <div
          className="song-details__left song-details__meta"
          onClick={() => {
            dispatch(setNowPlayingView(true))
            setFooterExpanded(!footerExpanded)
          }}>
          <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
        </div>
        <div className="song-details__right song-controls">
          {playing ?
            <div className="song-controls__icon song-controls__icon--wrapper song-controls__icon--pause" onClick={() => handlePause()}>
              <div className="song-controls__icon--svg">
                <GrPauseFill size={28} ></GrPauseFill>
              </div>
            </div>
            :
            <div className="song-controls__icon song-controls__icon--wrapper song-controls__icon--play" onClick={() => handlePlay()}>
              <div className="song-controls__icon--svg">
                <GrPlayFill size={28} ></GrPlayFill>
              </div>
            </div>
          }
          {/* <div className="song-controls__icon" onClick={() => handlePlayNext()}>
            <BsFillSkipForwardFill size={28} ></BsFillSkipForwardFill>
          </div> */}
        </div>
      </div>
      {/* <div className="footer__drawer-icon" id="popup"
      >
        <i className="fas fa-angle-up"></i>
      </div> */}
      {/* <div className="song__progress">
        <progress id="progress" value={0} max={100} />
        <input
          id='slider'
          type='range'
          name='rng'
          min='0'
          step='0.1'
          onChange={changeProgress}
          onMouseDown={() => playing && dispatch(togglePlaying())}
          onMouseUp={() => dispatch(togglePlaying())}
          onTouchStart={() => playing && dispatch(togglePlaying())}
          onTouchEnd={() => dispatch(togglePlaying())}
        ></input>
      </div> */}
    </div>
  )
}

export default Footer
