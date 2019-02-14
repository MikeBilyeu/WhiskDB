import React, {Component} from 'react'

const ImageUpload = ({input: {onChange}}) =>{

    return(
      <div>
      <label className='ui button positive' htmlFor='ImageUpload'><i className="upload icon"></i>Upload Image</label>
      <input
       type='file'
       accept='.jpg, .png, .jpeg'
       onChange={(e) => onChange(e.target.files[0])}
       id='ImageUpload'
       style={{display: 'none'}}
      /></div>

    )
}

export default ImageUpload;
