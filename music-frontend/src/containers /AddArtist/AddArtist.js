import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {newArtist} from "../../store /actions /artistsActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class AddArtist extends Component {
    state = {
        name: '',
        image: '',
        info: ''
    };
    submitFormHandler = async event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.newArtist(formData);
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
                            <Label for="name">Имя исполнителя</Label>
                            <Input type="text" name="name" id="name" placeholder="Имя исполнителя" value={this.state.name} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="info">Биография</Label>
                            <Input type="text" name="info" id="info" placeholder="Биография" value={this.state.info} onChange={this.inputChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Фото</Label>
                            <Input type="file" name="image" id="image" placeholder="Фото" onChange={this.fileChangeHandler}/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>: <Redirect from='addArtist' to='login'/>
                }

            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    newArtist: artistData => dispatch(newArtist(artistData))
});


export default connect(mapStateToProps, mapDispatchToProps)(AddArtist);