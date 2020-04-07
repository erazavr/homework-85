import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store /actions /usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        console.log('INFO FROM FACEBOOK: ' , facebookData);
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
            console.log('YES')
        } else {
            console.log('NO')
        }
    };
    return (
        <FacebookLoginButton
            appId="153072742695088"
            fields="name, email, picture"
            callback={callback}
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick}>
                    Login with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;