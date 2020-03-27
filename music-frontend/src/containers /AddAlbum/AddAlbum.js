import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {newAlbum} from "../../store /actions /albumsActions";
import {connect} from "react-redux";
import {getArtists} from "../../store /actions /artistsActions";
import {Redirect} from "react-router-dom";

class AddAlbum extends Component {
    state = {
        name: '',
        artist: '',
        year: '',
        image: ''
    };
    componentDidMount() {
        this.props.getArtists()
    }

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.newAlbum(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        return (
            <>
                {this.props.user ?
                    <Form onSubmit={this.submitFormHandler}>
                        <FormGroup>
                            <Label for="name">Название альбома</Label>
                            <Input type="text" name="name" id="name" placeholder="Название альбома" value={this.state.name} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="year">Год выхода</Label>
                            <Input type="text" name="year" id="year" placeholder="Год выхода" value={this.state.year} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Фото</Label>
                            <Input type="file" name="image" id="image" placeholder="Фото альбома" onChange={this.fileChangeHandler}/>
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
                                {this.props.artists && this.props.artists.map(artist => (
                                    <option key={artist._id} value={artist._id}>{artist.name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>: <Redirect from='addAlbum' to='login'/>
                }

            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    artists: state.artists.artists
});
const mapDispatchToProps = dispatch => ({
   newAlbum: albumData => dispatch(newAlbum(albumData)),
    getArtists: () => dispatch(getArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum);