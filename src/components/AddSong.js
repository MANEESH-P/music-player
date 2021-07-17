import React from 'react'
import { useDispatch } from 'react-redux'
import { addSongs } from "../redux/actions"



const AddSong = () => {
  const dispatch = useDispatch();
  const handleAddSongs = (e) => {
    dispatch(addSongs(e.currentTarget.files))
  }
  return (
    <div className="add-song">
      <div className='add-song__button'>
        <input
          id='song-input'
          onChange={(e) => handleAddSongs(e)}
          type='file'
          multiple
          accept='audio/mp3'
        />
        <label htmlFor="song-input">
          <i className="fas fa-plus"></i>
        </label>
      </div>
    </div>
  )
}

export default AddSong
