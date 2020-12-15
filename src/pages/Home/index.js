import React, { useEffect, useState } from 'react';
import axios from "axios"

import "./home.css"
import { useHistory } from 'react-router-dom';

const Home = React.memo(() => {
  const [data, setData] = useState([])

  const history = useHistory()

  useEffect(() => {
    (async() => {
      const result = await axios.get("https://api.imgflip.com/get_memes")

      setData(result.data.data.memes)
    })()

  }, [])

  const handleSubmit = (meme, e) =>{
    e.preventDefault();

    history.push("/meme", { meme });
    
  }
  
  return (
    <div className="container">
      <h1>Chose a template</h1>
      
      <div className="memes">
        {data.map(meme => {
          return(
            <button key={meme.id} onClick={(e) => handleSubmit(meme, e)}>
              <img src={meme.url} alt={meme.name}/>
            </button>
          )
       })}
      </div>
    </div>
  );
})

export default Home;