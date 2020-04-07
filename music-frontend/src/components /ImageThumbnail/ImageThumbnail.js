import React from 'react';
import noAvatar from "../../assets/images/noavatarpng.png"
import {apiURL} from "../../constans";
import {CardImg} from "reactstrap";

const ImageThumbnail = props => {
    let image = noAvatar;

    if (props.facebookId) {
        image = props.facebookId;
        return <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={image} alt="Card image cap" />
        // return <img src={image} className={props.class} alt='Artist' />
    }
    if (props.image) {
        image = apiURL + '/uploads/' + props.image;
    }

    return <CardImg style={{width: '50px'}} className='ml-2 mt-2' src={image} alt="Card image cap" />
};

export default ImageThumbnail;