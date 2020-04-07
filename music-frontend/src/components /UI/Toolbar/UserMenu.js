import React from 'react';
import {
    Card,
    CardBody,
    CardImg,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import ImageThumbnail from "../../ImageThumbnail/ImageThumbnail";
const UserMenu = ({user, logout}) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/history" exact>История прослушивания</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/addArtist" exact>Добавить исполнителя</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/addAlbum" exact>Добавить альбом</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/addTrack" exact>Добавить композицию</NavLink>
                </NavItem>
                {user.role === 'admin' ? (<NavItem>
                    <NavLink tag={RouterNavLink} to="/admin_office" exact>Офис админа</NavLink>
                </NavItem>): null}
            </Nav>
            <DropdownToggle nav caret>
                Hello, {user.firstName || user.username}!
                {
                  <ImageThumbnail image={user.avatar} facebookId={user.facebookId}/>
                    // user.avatar ? <CardImg style={{width: '100px'}} className='ml-2 mt-2' src={`http://localhost:8000/uploads/${user.avatar}`} alt="Card image cap" />: null
                }


            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    View profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};
export default UserMenu;