import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Container} from "reactstrap";
import {getArtists} from "../../store /actions /artistsActions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Artists extends Component {
    componentDidMount() {
        this.props.getArtists()
    }

    render() {
        const artists = this.props.artists;
        return (
            <Container>
                <h1>Исполнители: </h1>
                {artists &&
                    Object.keys(artists).map(item => (
                        <Card key={artists[item]._id} className='mb-5'>
                            {artists[item].image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={`http://localhost:8000/uploads/${artists[item].image}`} alt="Card image cap" /> : null}
                            <CardBody>
                                <CardTitle><b>Имя исполнителя:</b> {artists[item].name}</CardTitle>
                                <CardText><b>ИнформацияZ:</b> {artists[item].info}</CardText>
                                <NavLink to={`/albums/${artists[item]._id}`}>Посмотреть альбомы >></NavLink>
                            </CardBody>
                        </Card>
                ))}

            </Container>

        );
    }
}
const mapStateToProps = state => ({
    artists: state.artists.artists
});
const mapDispatchToProps = dispatch => ({
   getArtists: () => dispatch(getArtists())
});
export default connect(mapStateToProps, mapDispatchToProps) (Artists);