import { togglePlaying, playSong } from '../redux/actions';
import img from '../assets/logo512.png';

let store;
const mediaSessionEnabled = ('mediaSession' in navigator);
const addNewSong = async (id) => {
  const state = store.getState();
  const meta = await getMetadata(state.songs[id]);

  const { title, year, artist, album } = meta.tags ?? {};

  const picture = getPicture(meta);

  navigator.mediaSession.metadata = new window.MediaMetadata({
    title: title ?? state.songs[id].name,
    artist: artist ?? 'Unknown',
    album: album ?? 'Unknown',
    year: year,
    artwork: [{
      src: picture,
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '128x128',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '144x144',
      type: 'image/png',
    }, {
      src: picture,
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '256x256',
      type: 'image/png',
    },
    {
      src: picture,
      sizes: '384x384',
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
      const prevId = state.playState.songId === 0
        ? state.songs.length - 1 : state.playState.songId - 1;
      store.dispatch(playSong(prevId));
    }
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    if (store) {
      const state = store.getState();
      const nextId = (state.playState.songId + 1) % state.songs.length;
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

export default {
  setStore(s) {
    store = s;
  },
  playSong(song) {
    if (mediaSessionEnabled) {
      addNewSong(song);
    }
  },
};