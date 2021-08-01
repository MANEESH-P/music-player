const Navigator = window.navigator;

const isVibrateSupported = 'vibrate' in navigator;

const vibrate = (value) => {
  if (isVibrateSupported) {
    Navigator.vibrate([value]);
  }
}

export default {
  vibrate
}