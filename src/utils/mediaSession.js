import { togglePlaying, playSong } from '../redux/actions';
import img from '../assets/logo512.png';

let store;
const mediaSessionEnabled = ('mediaSession' in navigator);
const addNewSong = async (id) => {
  const state = store.getState();
  const meta = await getMetadata(state.songs[id]);

  const { title, artist, album } = meta.tags ?? {};
  console.log(meta.tags);
  const picture = getPicture(meta);

  navigator.mediaSession.metadata = new window.MediaMetadata({
    title: title ?? state.songs[id].name,
    artist: artist ?? 'Unknown',
    album: album ?? 'Unknown',
    artwork: [{
      src: picture,
      sizes: '16x16',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '24x24',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '64x64',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '128x128',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '256x256',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '512x512',
      type: 'image/png',
    }],
  });
};

const getMetadata = (song) =>
  new Promise(resolve => {
    window.jsmediatags.read(song, {
      onSuccess: function (tag) {
        resolve(tag);
      },
      onError: function (error) {
        console.log(error);
        resolve({});
      },
    });
  });


const getPicture = (meta) => {
  if (meta !== null) {
    const { picture: { data = undefined, format = undefined } = {} } =
      meta.tags ?? {};

    if (data && format) {
      let TYPED_ARRAY = new Uint8Array(data);
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, '');
      let base64String = btoa(STRING_CHAR);
      let imgurl = `data:${format};base64,${base64String}`;

      return imgurl;
    }
  }

  return img;
};

const addActionListeners = () => {
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    if (store) {
      const state = store.getState();
      const prevId = state.player.songId === 0
        ? state.songs.length - 1 : state.player.songId - 1;
      store.dispatch(playSong(prevId));
    }
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    if (store) {
      const state = store.getState();
      const nextId = (state.player.songId + 1) % state.songs.length;
      store.dispatch(playSong(nextId));
    }
  });

  navigator.mediaSession.setActionHandler('play', () => {
    if (store) store.dispatch(togglePlaying());
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (store) store.dispatch(togglePlaying());
  });
};
if (mediaSessionEnabled) addActionListeners();

const updateSongProgress = (audioPlayer) => {
  if (mediaSessionEnabled) {
    navigator.mediaSession.setPositionState({
      duration: audioPlayer.duration,
      position: audioPlayer.currentTime,
      playbackRate: audioPlayer.playbackRate,
    });
  }
}

export default {
  setStore(s) {
    store = s;
  },
  playSong(song) {
    if (mediaSessionEnabled) {
      addNewSong(song);
    }
  },
  updateSongProgress
};