import React from 'react'
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { addSongs } from "../redux/actions"



const AddSong = () => {
  const dispatch = useDispatch();
  const handleAddSongs = (e) => {
    dispatch(addSongs(e.currentTarget.files))
  }
  return (
    <div className="music-player__add-song" id="headerButton">
      <div className='music-player__add-song__button'>
        <input
          id='song-input'
          onChange={(e) => handleAddSongs(e)}
          type='file'
          multiple
          accept='audio/mp3'
        />
        <label htmlFor="song-input">
          <AiOutlinePlus size={24}/>
        </label>
      </div>
    </div>
  )
}

export default AddSong
