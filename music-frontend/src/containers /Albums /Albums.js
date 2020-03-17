import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Container} from "reactstrap";
import {getArtistAlbum} from "../../store /actions /albumsActions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Albums extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getArtistAlbum(id)
    }

    render() {
        return (
            <Container>
                {this.props.albums[0] ?
                <div>
                    <h1 className='mb-5'>Имя исполнителя : <span className='font-weight-light'>{this.props.albums[0].artist.name}</span></h1>
                    {this.props.albums.map(item => (
                        <Card key={item._id} className='mb-5'>
                            {item.image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2 border' src={`http://localhost:8000/uploads/${item.image}`} alt="Card image cap" /> : null}
                            <CardBody>
                                <CardTitle><b>Название Альбома:</b> {item.name}</CardTitle>
                                <CardSubtitle><b>Год:</b> {item.year}</CardSubtitle>
                                <NavLink to={`/albums/tracks/${item._id}`}>Посмотреть треки >></NavLink>
                            </CardBody>
                        </Card>
                    ))}
                </div>: <h1>Нету альбомов</h1>
                }

            </Container>
        );
    }
}
const mapStateToProps = state => ({
    albums: state.albums.albums
});
const mapDispatchToProps = dispatch => ({
    getArtistAlbum: id => dispatch(getArtistAlbum(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);