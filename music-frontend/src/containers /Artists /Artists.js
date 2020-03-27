import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Container} from "reactstrap";
import {getArtists} from "../../store /actions /artistsActions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Artists extends Component {
    componentDidMount() {
        this.props.getArtists()
    }
    artists = () => {
        let result = [];
        if(this.props.artists) {
            for (let i = 0; i < this.props.artists.length; i++) {
                if (this.props.artists[i].published) {
                    result.push(this.props.artists[i]);
                }
            }
        }

        if (result.length !== 0) {
            return result.map(item => {
                return <Card key={item._id} className='mb-5'>

                    {item.image ? <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={`http://localhost:8000/uploads/${item.image}`} alt="Card image cap" /> : null}
                    <CardBody>
                        <CardTitle><b>Имя исполнителя:</b> {item.name}</CardTitle>
                        <CardText><b>Информация:</b> {item.info}</CardText>
                        <NavLink to={`/albums/${item._id}`}>Посмотреть альбомы >></NavLink>
                    </CardBody>
                </Card>
            })
        } else {
            return <h1>Админ не опубликовал исполнителей</h1>
        }
    };
    render() {
        return (
            <Container>
                {this.artists()}
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