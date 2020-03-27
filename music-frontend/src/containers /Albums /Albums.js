import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Container} from "reactstrap";
import {getArtistAlbum} from "../../store /actions /albumsActions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {getArtist} from "../../store /actions /artistsActions";

class Albums extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getArtistAlbum(id);
        this.props.getArtist(id)
    }
    albums = () => {
        let result = [];
        if(this.props.albums) {
            for (let i = 0; i < this.props.albums.length; i++) {
                if (this.props.albums[i].published) {
                    result.push(this.props.albums[i]);
                }
            }
        }
        if (result.length !== 0) {
            return result.map(item => {
                return <Card key={item._id} className='mb-5'>
                    {item.image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2 border' src={`http://localhost:8000/uploads/${item.image}`} alt="Card image cap" /> : null}
                    <CardBody>
                        <CardTitle><b>Название Альбома:</b> {item.name}</CardTitle>
                        <CardSubtitle><b>Год:</b> {item.year}</CardSubtitle>
                        <NavLink to={`/albums/tracks/${item._id}`}>Посмотреть треки >></NavLink>
                    </CardBody>
                </Card>
            })
        } else {
            return <h1>Админ не опубликовал албомы данного исполнителя</h1>
        }
    };
    render() {
        return (
            <Container>
                <h1 className='mb-5'>Имя исполнителя : <span className='font-weight-light'>{this.props.artist.name}</span></h1>
                {this.albums()}
            </Container>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    artist: state.artists.artists,
    albums: state.albums.albums
});
const mapDispatchToProps = dispatch => ({
    getArtist: id => dispatch(getArtist(id)),
    getArtistAlbum: id => dispatch(getArtistAlbum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);