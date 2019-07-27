import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-navi';

const Header: React.FC = () => {
    return (
        <Navbar bg="light" expand="lg">
            <NavbarBrand href="#home">Translation Thing</NavbarBrand>
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <NavbarCollapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink as={ Link } href="/cultures">Cultures</NavLink>
                    <NavLink as={ Link } href="/">Flows</NavLink>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
};

export default Header;
