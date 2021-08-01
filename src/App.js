import React, { useState, useEffect } from 'react';
import './App.scss';
import './sass/main.scss';
import { useSelector, useDispatch } from 'react-redux';
import Home from "./home";
import * as localForage from 'localforage';
import { setDarkTheme } from "../src/redux/actions"




function App() {

  // const [localTheme, setLocalTheme] = useState('');

  // const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme)

  // useEffect(() => {
  //   localForage.getItem('theme').then((theme) => {
  //     console.log(theme, reduxTheme)
  //     if(theme !== reduxTheme){
  //       setLocalTheme(theme);
  //       dispatch(setDarkTheme(theme));
  //     }else{
  //       setLocalTheme(reduxTheme)
  //     }
  //   }) 
  // }, [])

  // useEffect(() => {
  //   setLocalTheme(reduxTheme);
  // }, [reduxTheme])

  return (
    <div className={`container ${theme}`}>
      <Home />
    </div>
  );
}

export default App;
