import React, { useState } from 'react'
import { BiSearchAlt2 } from 'react-icons/bi';
import * as localForage from 'localforage';
import AddSong from './AddSong';
import { FiSun, FiMoon } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { setDarkTheme } from "../redux/actions"


const Header = () => {

  const { theme } = useSelector(state => state.theme)

  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(setDarkTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <div className="music-player__header">
        <div className="music-player__header--left">
          <h3>Your Songs</h3>
        </div>
        <div className="music-player__header--right">
          <div onClick={() => handleThemeChange()}>
            {theme === 'dark' ?
              <FiSun size={24} /> :
              <FiMoon size={22} />
            }
          </div>
          <AddSong />
        </div>
      </div>
      {/* <div className="music-player__search" id="headerButton">
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#3b1f50"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 3l.01 10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4.01 4S14 19.21 14 17V7h4V3h-6zm-1.99 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
      </div> */}
    </>
  )
}

export default Header
