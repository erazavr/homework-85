import React, {Component} from 'react';
import {getHistory} from "../../store /actions /usersActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

class TrackHistory extends Component {
    componentDidMount() {
        this.props.getHistory();
    }
    render() {
        const user = this.props.user;
        const history = this.props.history;
        return (
            <>
                { user ?
                    <>
                        {history &&
                            <>
                                <h1 className='mb-5'>История прослушивания: </h1>
                                {history.map(item => (
                                    <Row key={item._id}>
                                        <Col sm="12">
                                            <Card body  className='mb-3'>
                                                <CardTitle><b>Исполнитель:</b> {item.artist}</CardTitle>
                                                <CardText><b>Название трека:</b> {item.trackName}</CardText>
                                                <CardText><b>Дата:</b> {item.datetime}</CardText>
                                            </Card>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        }
                    </>:<Redirect from='history' to='login'/>
                }
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    history: state.users.history
});
const mapDispatchToProps = dispatch => ({
   getHistory: () => dispatch(getHistory())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);