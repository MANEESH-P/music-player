import * as localForage from 'localforage';

export const saveState = (state) => {
  localForage.setItem('state', state);
};

export const getState = () =>
  localForage.getItem('state').then((state) => {
    if (state === null) {
      return undefined;
    }
    return state;
  });