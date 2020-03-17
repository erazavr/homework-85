import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from 'reactstrap';
import {useSelector} from "react-redux";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const Toolbar = () => {
    const user = useSelector(state => state.users.user);
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={RouterNavLink} to="/">Главная</NavbarBrand>
      <Nav className="ml-auto" navbar>
          {user ? (<UserMenu user={user}/>): (<AnonymousMenu/>)}
      </Nav>
    </Navbar>
  );
};

export default Toolbar;