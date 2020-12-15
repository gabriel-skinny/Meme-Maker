import React from 'react';
import { Switch, BrowserRouter, Route} from "react-router-dom"

import Home from "./pages/Home"
import Meme from "./pages/Meme"

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/meme" component={Meme}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;