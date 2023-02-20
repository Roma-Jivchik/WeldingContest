import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavigationMenu } from './NavigationMenu';
import Form from 'react-bootstrap/Form';

import './stylesheets/Layout.css'

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavigationMenu pageTitle={this.props.pageTitle} search={ <Form.Control />}/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
