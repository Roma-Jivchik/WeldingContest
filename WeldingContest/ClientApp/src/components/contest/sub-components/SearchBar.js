import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { FormView } from './FormView';
import { SearchBarView } from './SearchBarView';

export class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    render() {
        return (
            <SearchBarView />
        );
    }

    handleSubmit() {
    }

    handleChangeInput() {
    }
}