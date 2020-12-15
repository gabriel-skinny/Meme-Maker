import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from "react-router-dom"

import qs from 'qs';
import axios from 'axios';

import "./meme.css"

function Meme() {
  const [atualMeme, setAtualMeme] = useState();
  const [inputValues, setInputsValues] = useState([]);
  const [imageResult, setImageResult] = useState("");

  const location = useLocation()

  const handleInput = useCallback((index, e) => {
      const newValues = inputValues
      newValues[index] = e.target.value 
  
      setInputsValues(newValues);
   
  }, [inputValues])

  const handleSubmit = useCallback(async () => {
    const params = qs.stringify({
      template_id: atualMeme.id,
      username: 'vikayel543',
      password: 'vikayel543',
      boxes: inputValues.map(text => ({ text })),
    });
  
    const result = await axios.post(`https://api.imgflip.com/caption_image?${params}`)
  
    const { data: {data: { url }}} = await result;
  
    setImageResult(url)
  })

  useEffect(() => {
    setAtualMeme(location.state.meme)
  }, [location.state.meme])

  return (
    <div className="memeDetail">
      
      {imageResult ? <img src={imageResult} alt="memeImg"/> : (
        atualMeme ? (
          <div className="content">
            <div className="memeContent">
              <h1>{atualMeme.name}</h1>
              <img src={atualMeme.url} alt={atualMeme.name}/>
            </div>
            <div className="inputs">
              {new Array(atualMeme.box_count).fill("").map((_, index) => (
                <div key={index}>
                  <span>Text {index + 1}</span>
                  <input onChange={(e) => handleInput(index, e)} type="text"/>
                </div>            
              ))}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        ) : (
          <h1>No meme found</h1>
        )
      )}
     
    </div>  
  );
}

export default Meme;