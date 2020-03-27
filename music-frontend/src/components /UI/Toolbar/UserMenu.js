import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
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
                Hello, {user.username}!
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