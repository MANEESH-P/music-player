import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useGetSongDetails from "../utils/useGetSongDetails"
import vibrateHelper from '../utils/vibrate';
import { playSong, togglePlaying, repeatSong, setNowPlayingView } from "../redux/actions"
import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs';
import { RiShuffleFill, RiRepeat2Fill, RiRepeatOneFill } from 'react-icons/ri';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { IoMdShuffle, IoMdRepeat } from "react-icons/io";
import { MdRepeat, MdRepeatOne } from "react-icons/md"
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';
import { FaPlay, FaPause } from 'react-icons/fa';
import { GrPlayFill, GrPauseFill } from 'react-icons/gr';
import defaultBackground from '../assets/defaultBackground.svg'
import Visualizer from './Visualizer';

const NowPlaying = ({ audioPlayer, currentTime }) => {
  const [footerExpanded, setFooterExpanded] = useState(false);

  const songs = useSelector(state => state.songs);
  const { playing, songId, repeat } = useSelector(state => state.player)

  const { songDetails } = useGetSongDetails(songs[songId]);

  const dispatch = useDispatch()

  const handlePlay = () => {
    if (songId !== undefined) {
      dispatch(playSong(songId))
    }
    vibrateHelper.vibrate(10);
  }
  const handlePause = () => {
    dispatch(togglePlaying());
    vibrateHelper.vibrate(10);
  }
  const handlePlayNext = () => {
    if (songId !== undefined) {
      dispatch(playSong((songId + 1) % songs.length))
    }
    vibrateHelper.vibrate(10);
  }

  const handlePlayPrev = () => {
    if (songId !== undefined) {
      dispatch(playSong((songId > 0
        ? (songId - 1) % songs.length
        : songs.length - 1)))
    }
    vibrateHelper.vibrate(10);
  }

  const handleRepeat = () => {
    if (repeat) {
      dispatch(repeatSong(0));
    } else {
      dispatch(repeatSong(1));
    }
    vibrateHelper.vibrate(10);
  }

  const handleRandom = () => {
    dispatch(playSong(Math.floor(Math.random() * (songs.length))))
    vibrateHelper.vibrate(10);
  }

  const changeProgress = () => {
    const progressBar = document.getElementById('slider');
    if (audioPlayer) {
      audioPlayer.currentTime = progressBar.value;
    }
  };

  const changeView = () => {
    dispatch(setNowPlayingView(false));
  }

  useEffect(() => {
    const progressBar = document.getElementById('slider');
    progressBar.value = 0;
    var aud = document.getElementById('player');
    if (aud.duration) {
      progressBar.max = aud.duration;
    }
    if (aud.currentTime) {
      progressBar.value = aud.currentTime;
    }
  }, [])

  const noSongsAdded = songs.length === 0;
  return (
    <div className="music-player__now-playing" id="footer">
      <div className="background-gradient"
      //  style={{ backgroundImage: `url('${songDetails?.url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      >
        <img src={songDetails?.url} alt="" />
      </div>
      <div className="back-button" onClick={() => changeView()}>
        <FiChevronLeft size={22} />
      </div>
      <div className="song-details">
        <div
          className="song-details__cover"
        // style={{ backgroundImage: `url('${songDetails?.url || defaultBackground}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        >
          <img src={songDetails?.url || defaultBackground} alt="" />
        </div>
        <div className="song-details__meta">
          <div className="song-details__meta--song-name">
            <h4>{noSongsAdded ? 'No song added' : songs[songId]?.name}</h4>
          </div>
          <div className="song-details__meta--song-artist">
            <p>{songDetails.artist ? songDetails.artist : 'Unknown Artist'}</p>
          </div>
        </div>
      </div>
      <div className='song-status'>
        <div className="song-status__progress">
          <input
            id='slider'
            type='range'
            name='rng'
            min='0'
            step='0.01'
            onChange={changeProgress}
            onMouseDown={() => playing && dispatch(togglePlaying())}
            onMouseUp={() => dispatch(togglePlaying())}
            onTouchStart={() => playing && dispatch(togglePlaying())}
            onTouchEnd={() => dispatch(togglePlaying())}
          ></input>
        </div>
        <div>
          <div className="song-status__current-time">
            <p>{currentTime}</p>
          </div>
          <div className="song-status__duration">
            <p>{songDetails && songDetails.duration}</p>
          </div>
        </div>
      </div>
      <div className="song-controls">
        <div className="song-controls__icon song-controls__icon--shuffle">
          <IoMdShuffle size={22} onClick={() => handleRandom()}></IoMdShuffle>
        </div>
        <div className="song-controls__icon song-controls__icon--skip-back">
          <AiFillBackward size={28} onClick={() => handlePlayPrev()}></AiFillBackward>
        </div>
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
        <div className="song-controls__icon song-controls__icon--skip-forward">
          <AiFillForward size={28} onClick={() => handlePlayNext()}></AiFillForward>
        </div>
        <div className="song-controls__icon song-controls__icon--repeat">
          {repeat ?
            <MdRepeatOne size={28} onClick={() => handleRepeat()}></MdRepeatOne>
            :
            <MdRepeat size={28} onClick={() => handleRepeat()}></MdRepeat>
          }
        </div>
      </div>
      <Visualizer playing={playing} audioPlayer={audioPlayer} />
    </div>
  )
}

export default NowPlaying
