import React, {Component} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Container,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import {getAlbumTracks} from "../../store /actions /tracksActions";
import {connect} from "react-redux";
import {getArtist} from "../../store /actions /artistsActions";
import {saveTrack} from "../../store /actions /usersActions";

class Tracks extends Component {
    state = {
        video: false,
        src: '',
        title: '',
    };
     componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getAlbumTracks(id);
        this.props.getArtist(this.props.tracks[0] && this.props.tracks[0].album.artist)
    }
    showVideo = e => {
        this.setState({video: !this.state.video, src: e.target.id, title: e.target.name});
    };
    closeVideo = () => {
        this.setState({video: false})
    };

    render() {
        return (
            <Container>
                {this.props.tracks[0] ?
                    <div>
                        {this.state.video ?
                            <div >
                                <Modal isOpen={this.state.video} toggle={this.showVideo}>
                                    <ModalHeader toggle={this.showVideo}>Название трека: {this.state.title}</ModalHeader>
                                    <ModalBody>
                                        <iframe width="420"
                                                height="315"
                                                src={this.state.src}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title='myTitle'
                                        />

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="secondary" onClick={this.closeVideo}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>: null
                        }
                        <div className='mb-5'>
                            <h2 className='mb-2'>Имя исполнителя : <span className='font-weight-light'>{this.props.artist.name}</span></h2>
                            <h2>Название альбома : <span className='font-weight-light'>{this.props.tracks[0].album.name}</span></h2>
                        </div>
                        {this.props.tracks.map(item => (
                            <Card key={item._id} className='mb-5' >
                                <CardBody>
                                    <CardTitle onClick={this.showVideo}><b>Название трека:</b> {item.name}</CardTitle>
                                    <CardSubtitle className='mb-2'><b>Номер:</b> {item.number}</CardSubtitle>
                                    <CardSubtitle className='mb-2'><b>Продолжительность:</b> {item.duration}</CardSubtitle>
                                    <Button color='primary'  onClick={()=>this.props.saveTrack(item._id)} className='mb-3'>Послушал</Button>
                                    {item.video ?
                                        <div>
                                            <Button
                                                type='button'
                                                color='success'
                                                id={item.video}
                                                name={item.name}
                                                onClick={this.showVideo}>
                                                Посмотреть на YouTube
                                                <img

                                                    src="https://pngimg.com/uploads/youtube/youtube_PNG15.png"
                                                    alt="youtube"
                                                    style={{width: "50px"}}
                                                />
                                            </Button>

                                        </div>: null}
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
   user: state.users.user ,
   tracks: state.tracks.tracks,
   artist: state.artists.artists
});
const mapDispatchToProps = dispatch => ({
    getAlbumTracks: id => dispatch(getAlbumTracks(id)),
    getArtist: id => dispatch(getArtist(id)),
    saveTrack: trackId => dispatch(saveTrack(trackId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Tracks);