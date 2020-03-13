import React, {Component} from 'react';
import {Card, CardBody, CardSubtitle, CardText, CardTitle, Container} from "reactstrap";
import {getAlbumTracks} from "../../store /actions /tracksActions";
import {connect} from "react-redux";
import {getArtist} from "../../store /actions /artistsActions";

class Tracks extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.getAlbumTracks(id);
        this.props.getArtist(this.props.tracks[0] && this.props.tracks[0].album.artist)
    }

    render() {
        return (
            <Container>
                {this.props.tracks[0] ?
                    <div>
                        <div className='mb-5'>
                            <h2 className='mb-2'>Имя испольнителя : <span className='font-weight-light'>{this.props.artist.name}</span></h2>
                            <h2>Название альбома : <span className='font-weight-light'>{this.props.tracks[0].album.name}</span></h2>
                        </div>
                        {this.props.tracks.map(item => (
                            <Card key={item._id} className='mb-5'>
                                <CardBody>
                                    <CardTitle><b>Название трека:</b> {item.name}</CardTitle>
                                    <CardSubtitle><b>Номер:</b> {item.number}</CardSubtitle>
                                </CardBody>
                            </Card>
                        ))}
                    </div>: <h1>Нету треков</h1>
                }

            </Container>
        );
    }
}

const mapStateToProps = state => ({
   tracks: state.tracks.tracks,
   artist: state.artists.artists
});
const mapDispatchToProps = dispatch => ({
    getAlbumTracks: id => dispatch(getAlbumTracks(id)),
    getArtist: id => dispatch(getArtist(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Tracks);