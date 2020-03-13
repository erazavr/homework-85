import React from 'react';
import {Route, Switch} from "react-router-dom";
import Artists from "./containers /Artists /Artists";
import Albums from "./containers /Albums /Albums";
import Tracks from "./containers /Tracks/Tracks";

const App = () => {
    return (
        <Switch>
            <Route path='/' exact component={Artists}/>
            <Route path='/albums/:id' exact component={Albums}/>
            <Route path='/albums/tracks/:id' exact component={Tracks}/>
            <Route render={()=> <h1>Not Found</h1>}/>
        </Switch>
    );
};

export default App;