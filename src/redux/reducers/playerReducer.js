import { PLAY_SONG, TOGGLE_PLAYING, SET_ACTIVE_SONG, REPEAT, SET_NOW_PLAYING_VIEW } from '../actions';

const initalState = {
  playing: false,
  songId: 0,
  repeat: 0,
  nowPlayingView: false
};

export default (state = initalState, action) => {
  switch (action.type) {
    case PLAY_SONG: {
      return { ...state, playing: true, songId: action.payload };
    }
    case TOGGLE_PLAYING: {
      return Object.assign({}, state, { playing: !state.playing });
    }
    case REPEAT: {
      return { ...state, repeat: action.payload };
    }
    case SET_ACTIVE_SONG: {
      return {...state, songId: action.payload};
    }
    case SET_NOW_PLAYING_VIEW : {
      return {...state, nowPlayingView: action.payload }
    }
    default: {
      return state;
    }
  }
};
