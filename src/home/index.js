import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { togglePlaying, playSong } from '../redux/actions';
import Header from "../components/Header";
import Footer from "../components/Footer";
import SongList from "../components/SongList";
import AddSong from '../components/AddSong';

let audioPlayer = null;

const Home = () => {
  const songs = useSelector(state => state.songs);
  const player = useSelector(state => state.player)
  const repeat = useSelector(state => state.repeat);

  const dispatch = useDispatch();

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevPlayer = usePrevious(player);

  useEffect(() => {
    if (songs[0]) {
      audioPlayer.src = URL.createObjectURL(songs[0]);
    }
  }, []);

  useEffect(() => {
    // if (player.playing) {
    //   play(player.songId);
    // }
    if (!player.playing) {
      // PAUSE
      audioPlayer.pause();
    } else if (player.songId === -1) {
      play(0);
    } else if (player.songId === prevPlayer.songId) {
      // RESUME
      console.log('Should only resume');
      audioPlayer.play();
      // Start playing
    } else {
      play(player.songId);
    }
  }, [player]);

  const updateProgress = () => {
    var aud = document.getElementById('player');
    var progressBar = document.getElementById('progress');
    if (aud.currentTime && aud.duration) {
      progressBar.value = (aud.currentTime / aud.duration) * 100;
    }
  };

  const play = (id) => {
    if (songs[id]) {
      const fileSrc = URL.createObjectURL(songs[id]);
      audioPlayer.src = fileSrc;
      audioPlayer.play();
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
    if (repeat === 0) {
      URL.revokeObjectURL(songs[player.songId]);
      if (player.songId < songs.length - 1) dispatch(playSong(player.songId + 1));
    } else if (repeat === 1) {
      // repeat one
      dispatch(playSong(player.songId));
      // repeat all
    } else playNext();
  };

  return (
    <div className="music-player">
      <Header />
      <SongList />
      <AddSong />
      <Footer />
      <audio
        hidden
        controls
        id='player'
        onEnded={songEnded}
        ref={(audio) => {
          audioPlayer = audio;
        }}
        // onLoadedMetadata={mDur}
        onTimeUpdate={updateProgress}
      >
        <track kind='captions' {...{}} />
      </audio>
    </div>
  )
}

export default Home
