export const FETCH_SONGS = 'FETCH_SONGS';
export const ADD_SONGS = 'ADD_SONGS';
export const DELETE_SONG = 'DELETE_SONG';
export const PLAY_SONG = 'PLAY_SONG';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const PLAY_NEXT_SONG = 'PLAY_NEXT_SONG';
export const PLAY_PREV_SONG = 'PLAY_PREV_SONG';
export const REPEAT = 'REPEAT';
export const SET_ACTIVE_SONG = 'SET_ACTIVE_SONG';
export const SET_NOW_PLAYING_VIEW = 'SET_NOW_PLAYING_VIEW'

export const fetchSongs = () => {
  return {
    type: FETCH_SONGS,
  };
};

export const addSongs = (songs) => {
  return {
    type: ADD_SONGS,
    payload: songs,
  };
};

export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    payload: id,
  };
};

export const playSong = (id) => {
  return {
    type: PLAY_SONG,
    payload: id,
  };
};

export const togglePlaying = () => {
  return {
    type: TOGGLE_PLAYING,
  };
};

export const playNextSong = () => {
  return {
    type: PLAY_NEXT_SONG,
  };
};

export const playPrevSong = () => {
  return {
    type: PLAY_PREV_SONG,
  };
};

export const repeatSong = (repeat) => {
  return {
    type: REPEAT,
    payload:repeat
  };
};

export const setActiveSong = (id) => {
  return {
    type:SET_ACTIVE_SONG,
    payload: id
  }
}

export const setNowPlayingView = (nowPlaying) => {
  return {
    type: SET_NOW_PLAYING_VIEW,
    payload: nowPlaying
  }
}