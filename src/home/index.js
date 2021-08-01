import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { togglePlaying, playSong } from '../redux/actions';
import mediaSession from '../utils/mediaSession';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SongList from "../components/SongList";
import AddSong from '../components/AddSong';
import NowPlaying from '../components/NowPlaying';


const Home = () => {
  const [currentTime, setCurrentTime] = useState('00.00');

  const songs = useSelector(state => state.songs);
  const player = useSelector(state => state.player)
  const { nowPlayingView } = useSelector(state => state.player)

  const dispatch = useDispatch();

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevPlayer = usePrevious(player);
  let audioPlayer = useRef(null);

  useEffect(() => {
    if (songs[0]) {
      audioPlayer.current.src = URL.createObjectURL(songs[0]);
    }
  }, []);

  useEffect(() => {
    // if (player.playing) {
    //   play(player.songId);
    // }
    if (!player.playing) {
      // PAUSE
      audioPlayer.current.pause();
    } else if (player.songId === -1) {
      play(0);
    } else if (player.songId === prevPlayer.songId) {
      // RESUME
      if (audioPlayer.current.src) {
        audioPlayer.current.play();
      } else {
        if (songs[player.songId]) {
          audioPlayer.current.src = URL.createObjectURL(songs[player.songId]);
          audioPlayer.current.play();
        }
      }
      // Start playing
    } else {
      play(player.songId);
      mediaSession.playSong(player.songId);

    }
  }, [player]);

  const getTime = (time) => {
    return time ? new Date(time * 1000).toISOString().substr(14, 5) : '';
  };

  const updateProgress = () => {
    var aud = document.getElementById('player');
    var progressBar = document.getElementById('slider');
    if (aud.currentTime && aud.duration && nowPlayingView) {
      progressBar.value = aud.currentTime;
      // console.log(aud.currentTime);
      setCurrentTime(getTime(aud.currentTime))
      mediaSession.updateSongProgress(aud);
    }
  };

  const initialiseProgressBar = () => {
    var aud = document.getElementById('player');
    var progressBar = document.getElementById('slider');
    if (aud.duration && nowPlayingView) {
      progressBar.max = aud.duration;
      console.log(aud.duration)
    }
  };

  const play = async (id) => {
    if (songs[id]) {
      const fileSrc = URL.createObjectURL(songs[id]);
      audioPlayer.current.src = fileSrc;
      await audioPlayer.current.play();
      window.document.title = songs[id].name.replace('.mp3', '');
    }
  };

  const playNext = () => {
    URL.revokeObjectURL(songs[player.songId]);
    const nextSongId = (player.songId + 1) % songs.length;
    dispatch(playSong(nextSongId));
  };

  const songEnded = () => {
    // No repeat
    if (player.repeat === 0) {
      URL.revokeObjectURL(songs[player.songId]);
      if (player.songId < songs.length - 1) dispatch(playSong(player.songId + 1));
    } else if (player.repeat === 1) {
      // repeat one
      dispatch(playSong(player.songId));
      // repeat all
    } else playNext();
  };

  return (
    <div className="music-player">
      {!nowPlayingView &&
        <>
          <Header />
          <AddSong />
        </>
      }
      <SongList audioPlayer={audioPlayer.current} />
      {nowPlayingView &&
        <NowPlaying audioPlayer={audioPlayer.current} currentTime={currentTime} />
      }
      <Footer audioPlayer={audioPlayer.current} currentTime={currentTime} />
      <audio
        hidden
        controls
        id='player'
        onEnded={songEnded}
        ref={audioPlayer}
        onLoadedMetadata={initialiseProgressBar}
        onTimeUpdate={updateProgress}
      >
        <track kind='captions' {...{}} />
      </audio>
    </div>
  )
}

export default Home
