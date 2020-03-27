import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {getArtistAlbum} from "../../store /actions /albumsActions";
import {connect} from "react-redux";
import {newTrack} from "../../store /actions /tracksActions";
import {getArtists} from "../../store /actions /artistsActions";
import {Redirect} from "react-router-dom";

class AddTrack extends Component {
    state = {
      name: '',
      album: '',
      duration: '',
      number: null,
      artist: '',
      video: ''
    };
    componentDidMount() {
        this.props.getArtists();
    }
    submitFormHandler = async event => {
        event.preventDefault();
        if (this.state.video.includes('embed')) {
            const track = {
                name: this.state.name,
                album: this.state.album,
                duration: this.state.duration,
                number: this.state.number,
                video: this.state.video
            };
            await this.props.newTrack(track);
        } else {
            alert('Вы ввели неверную ссылку');
            alert('1) Найдите нужный видеоролик из YouTube \n2) Нажмите на "поделиться", потом на "встроить" \n3) Скопируйте ссылку из src')
        }

    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.name === 'artist') {
            return this.props.getAlbums(event.target.value)
        }

    };
    render() {
        return (
            <>
                {this.props.user ?
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="name">Название композиции</Label>
                            <Input type="text" name="name" id="name" placeholder="Название композции" value={this.state.name} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Длительность</Label>
                            <Input type="number" name="duration" id="duration" placeholder="Длительность композии" value={this.state.duration} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="number">Номер композии</Label>
                            <Input type="number" name="number" id="number" placeholder="Номер" onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="video">Ссылка на видео</Label>
                            <Input type="text" name="video" id="video" placeholder="Ссылка на видео" onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="artist">Автор альбома</Label>
                            <Input
                                type="select"
                                name="artist" id="artist"
                                value={this.state.artist}
                                onChange={this.inputChangeHandler}

                            >
                                <option value="">Please select a category...</option>
                                {this.props.artists && Object.keys(this.props.artists).map(artist => (
                                    <option key={this.props.artists[artist]._id} value={this.props.artists[artist]._id}>{this.props.artists[artist].name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        {
                            this.state.artist &&
                            <FormGroup>
                                <Label for="album">Альбом данного исполнителя</Label>
                                <Input
                                    type="select"
                                    name="album" id="album"
                                    value={this.state.album}
                                    onChange={this.inputChangeHandler}

                                >
                                    <option value="">Please select a category...</option>
                                    {this.props.albums && Object.keys(this.props.albums).map(album => (
                                        <option key={this.props.albums[album]._id} value={this.props.albums[album]._id}>{this.props.albums[album].name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        }
                        <Button type='submit'>Submit</Button>
                    </Form>: <Redirect from='addTrack' to='login'/>
                }
            </>
        );
    }
}
const mapStateToProps = state => ({
   user: state.users.user,
   albums: state.albums.albums,
   artists: state.artists.artists
});
const mapDispatchToProps = dispatch => ({
   getAlbums: (id) => dispatch(getArtistAlbum(id)),
   newTrack: trackData => dispatch(newTrack(trackData)),
   getArtists: () => dispatch(getArtists())
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTrack);