import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useGetSongDetails from "../utils/useGetSongDetails"
import { playSong, togglePlaying, repeatSong } from "../redux/actions"
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { RiShuffleFill, RiRepeat2Fill, RiRepeatOneFill } from 'react-icons/ri';
import { FaPlay, FaPause } from 'react-icons/fa';
import defaultBackground from '../assets/defaultBackground.svg'
import Visualizer from './Visualizer';

const Footer = ({ audioPlayer, currentTime }) => {
  const [footerExpanded, setFooterExpanded] = useState(false);

  const songs = useSelector(state => state.songs);
  const { playing, songId, repeat } = useSelector(state => state.player)

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

  const handleRepeat = () => {
    if (repeat) {
      dispatch(repeatSong(0));
    } else {
      dispatch(repeatSong(1));
    }
  }

  const handleRandom = () => {
    dispatch(playSong(Math.floor(Math.random() * (songs.length))))
  }

  const changeProgress =  () => {
    const progressBar = document.getElementById('slider');
    if (audioPlayer) {
      audioPlayer.currentTime = progressBar.value;
    }
  };

  useEffect(() => {
    let popup = document.getElementById('popup');
    const progressBar = document.getElementById('slider');
    progressBar.value = 0;
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
        <div className="song-details__cover" style={{ backgroundImage: `url('${songDetails?.url || defaultBackground}')`, backgroundPosition: 'center', backgroundSize: 'cover' }} >
          {/* {!songDetails?.url &&
            <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 0 24 24" width="100px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3l.01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
          } */}
        </div>
        <div className="song-details__meta">
          <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
        </div>
      </div>
      <div className="footer__drawer-icon" id="popup" onClick={() => setFooterExpanded(!footerExpanded)}>
        <i className="fas fa-angle-up"></i>
      </div>
      <div className="footer--topbar">
        <div className="song__controls">
          <RiShuffleFill size={24} onClick={() => handleRandom()}></RiShuffleFill>
          <BsFillSkipBackwardFill size={28} onClick={() => handlePlayPrev()}></BsFillSkipBackwardFill>
          {playing ?
            <FaPause size={28} onClick={() => handlePause()}></FaPause>
            :
            <FaPlay size={28} onClick={() => handlePlay()}></FaPlay>
          }
          <BsFillSkipForwardFill size={28} onClick={() => handlePlayNext()}></BsFillSkipForwardFill>
          {repeat ?
            <RiRepeatOneFill size={24} onClick={() => handleRepeat()}></RiRepeatOneFill>
            :
            <RiRepeat2Fill size={24} onClick={() => handleRepeat()}></RiRepeat2Fill>
          }
        </div>
        <div className='song__status'>
          <div className="song__status--current-time">
            <p>{currentTime}</p>
          </div>
          <div className="song__status--duration">
            <p>{songDetails && songDetails.duration}</p>
          </div>
        </div>
        <div className="song__progress">
          {/* <progress id="progress" value={0} max={100} /> */}
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
            onTouchEnd={() =>  dispatch(togglePlaying())}
          ></input>
        </div>
      </div>
      {
        <Visualizer playing={playing} audioPlayer={audioPlayer} />
      }
    </div>
  )
}

export default Footer
