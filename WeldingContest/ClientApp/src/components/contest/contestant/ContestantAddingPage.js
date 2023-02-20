import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { FormComponent } from '../sub-components/FormComponent';

export class ContestantAddingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormComponent />
        );
    }
}