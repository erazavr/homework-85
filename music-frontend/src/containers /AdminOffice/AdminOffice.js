import React, {Component} from 'react';
import {Button, Card, CardBody, CardImg, CardTitle, Col, Container, Row} from "reactstrap";
import {artistPublish, deleteArtist, getArtists} from "../../store /actions /artistsActions";
import {deleteTrack, getAlbumTracks, trackPublish} from "../../store /actions /tracksActions";
import {albumPublish, deleteAlbum, getArtistAlbum} from "../../store /actions /albumsActions";
import {connect} from "react-redux";

class AdminOffice extends Component {
    componentDidMount() {
        this.props.getArtists();
        this.props.getAlbumTracks();
        this.props.getArtistAlbum()
    }
    header = (title) => {
        return <h2 className='mb-5 mt-4'>{title}</h2>
    };
    render() {
        const artists = this.props.artists;
        const albums = this.props.albums;
        const tracks = this.props.tracks;
        const initialStyle = {
            position: 'absolute',
            top: '0',
            right: '0',
            color: 'white',
            padding: '5px 10px',
            borderTopRightRadius: '2px'
        };
        const publishedTrue = {...initialStyle, background: '#13d613'};
        const publishedFalse = {...initialStyle, background: 'red'};
        return (
            <Container>
                        <>
                            {this.header('Исполнители:')}
                            <Row>
                                {artists && Object.keys(artists).map(artist => (
                                    <Col sm={4} >
                                        <Card className='mb-3 position-relative' key={artist._id}>
                                            {artists[artist].image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={`http://localhost:8000/uploads/${artists[artist].image}`} alt="Card image cap" /> : null}
                                            <CardBody>
                                                <CardTitle>Имя исполнителя: {artists[artist].name}</CardTitle>
                                                {artists[artist].published === false ?
                                                    <>
                                                        <Button color='primary' onClick={() => this.props.artistPublish(artists[artist]._id)}>Опубликовать</Button>
                                                        <p style={publishedFalse}>Неопубликовано</p>
                                                    </>:
                                                    <>
                                                        <Button color='danger' onClick={() => this.props.deleteArtist(artists[artist]._id)}>Удалить</Button>
                                                        <p style={publishedTrue}>Опубликовано</p>
                                                    </>


                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                        <>
                            {this.header('Албомы:')}
                            <Row>
                                {albums && Object.keys(albums).map(album => (
                                    <Col sm={4} >
                                        <Card className='mb-3' key={album._id}>
                                            {albums[album].image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={`http://localhost:8000/uploads/${albums[album].image}`} alt="Card image cap" /> : null}
                                            <CardBody>
                                                <CardTitle>Название альбома: {albums[album].name}</CardTitle>
                                                {albums[album].published === false ?
                                                    <>
                                                        <Button color='primary' onClick={() => this.props.albumPublish(albums[album]._id)}>Опубликовать</Button>
                                                        <p style={publishedFalse}>Неопубликовано</p>
                                                    </>:
                                                    <>
                                                        <Button color='danger' onClick={() => this.props.deleteAlbum(albums[album]._id)}>Удалить</Button>
                                                        <p style={publishedTrue}>Опубликовано</p>
                                                    </>

                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                        <>
                            {this.header('Композиции:')}
                            <Row>
                                {tracks && Object.keys(tracks).map(track => (
                                    <Col sm={4} >
                                        <Card className='pt-5 pb-5 mb-3' key={tracks[track]._id}>
                                            <CardBody>
                                                <CardTitle>Название композиции: {tracks[track].name}</CardTitle>
                                                {tracks[track].published === false ?
                                                    <>
                                                        <Button color='primary' onClick={() => this.props.trackPublish(tracks[track]._id)}>Опубликовать</Button>
                                                        <p style={publishedFalse}>Неопубликовано</p>
                                                    </>:
                                                    <>
                                                        <Button color='danger' onClick={() => this.props.deleteTrack(tracks[track]._id)}>Удалить</Button>
                                                        <p style={publishedTrue}>Опубликовано</p>
                                                    </>
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>


            </Container>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists,
    albums: state.albums.albums,
    tracks: state.tracks.tracks,
});
const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtists()),
    getAlbumTracks: () => dispatch(getAlbumTracks()),
    getArtistAlbum: () => dispatch(getArtistAlbum()),
    artistPublish: id => dispatch(artistPublish(id)),
    albumPublish: id => dispatch(albumPublish(id)),
    trackPublish: id => dispatch(trackPublish(id)),
    deleteArtist: id => dispatch(deleteArtist(id)),
    deleteAlbum: id => dispatch(deleteAlbum(id)),
    deleteTrack: id => dispatch(deleteTrack(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOffice);