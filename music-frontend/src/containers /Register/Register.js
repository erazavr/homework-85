import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store /actions /usersActions";
import {connect} from "react-redux";
import FormElement from "../../components /FormElement/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        avatar: '',
    };
    submitFormHandler = event => {
        event.preventDefault();
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.registerUser(formData);
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    getFieldError = fieldName => {
      try {
          return this.props.error.errors[fieldName].message
      } catch (error) {
        return undefined
      }
    };
    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    render() {
        return (
            <>
                <Container>
                    <h1 className='mb-5'>Регистрация</h1>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName='username'
                            title='Имя пользователя'
                            value={this.state.username}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('username')}
                            placeholder='Ваше имя'
                            autoComplete='new-username'
                            required={true}
                            type='text'
                        />
                        <FormElement
                            propertyName='password'
                            title='Ваш пароль'
                            value={this.state.password}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('password')}
                            placeholder='Пароль'
                            autoComplete='new-password'
                            required={true}
                            type='password'
                        />
                        <FormElement
                            propertyName='image'
                            title='Ваше изображение'
                            onChange={this.fileChangeHandler}
                            error={this.getFieldError('avatar')}
                            placeholder='Изображение'
                            required={true}
                            type='file'
                        />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button color='primary' type='submit'>
                                 Зарегистрироваться
                            </Button>
                        </Col>
                    </FormGroup>
                    </Form>
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
   loading: state.users.registerLoading,
   error: state.users.registerError
});
const mapDispatchToProps = dispatch => ({
   registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);