﻿import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export class NavigationMenu extends Component {
    static displayName = NavigationMenu.name;
    constructor(props) {
        super(props);
    }

    render() {
        let content;

        if (window.location.href.toLowerCase().includes("searching")) {
            content = this.props.search;
        } else {
            content = <div />;
        }

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/">Проект</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/Contestants">Конкурсанты</Nav.Link>
                        <Nav.Link href="/Contests">Конкурсы</Nav.Link>
                        <Nav.Link href="/Nominations">Номинации</Nav.Link>
                        <Nav.Link href="/ContestWorks">Конкурсные работы</Nav.Link>
                    </Nav>
                    { content}
                    <Navbar.Brand style={{ "marginLeft": "auto" }}>
                        {this.props.pageTitle}
                    </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}