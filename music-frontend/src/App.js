import React from 'react';
import {Route, Switch} from "react-router-dom";
import Artists from "./containers /Artists /Artists";
import Albums from "./containers /Albums /Albums";
import Tracks from "./containers /Tracks/Tracks";
import {Container} from "reactstrap";
import Toolbar from "./components /UI/Toolbar/Toolbar";
import Register from "./containers /Register/Register";
import Login from "./containers /Login/Login";
import TrackHistory from "./containers /History /TrackHistory";
import AddArtist from "./containers /AddArtist/AddArtist";
import AddAlbum from "./containers /AddAlbum/AddAlbum";
import AddTrack from "./containers /AddTrack/AddTrack";
import AdminOffice from "./containers /AdminOffice/AdminOffice";
import {ToastContainer} from "react-toastify";

const App = () => {
    return (
        <>
            <ToastContainer autoClose={2000}/>
            <header>
                <Toolbar/>
            </header>
            <Container className='mt-5'>
                <Switch>
                    <Route path='/' exact component={Artists}/>
                    <Route path='/albums/:id' exact component={Albums}/>
                    <Route path='/albums/tracks/:id' exact component={Tracks}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/history' exact component={TrackHistory}/>
                    <Route path='/addArtist' exact component={AddArtist}/>
                    <Route path='/addAlbum' exact component={AddAlbum}/>
                    <Route path='/addTrack' exact component={AddTrack}/>
                    <Route path='/admin_office' exact component={AdminOffice}/>
                    <Route render={()=> <h1>Not Found</h1>}/>
                </Switch>
            </Container>
        </>
    );
};

export default App;