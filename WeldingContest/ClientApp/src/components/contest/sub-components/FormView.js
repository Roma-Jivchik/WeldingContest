import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';

export class FormView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={ this.props.handleSubmit}>
                    {this.props.keys.map((key, index) => (
                        <Form.Group className="mb-3" key={index}>
                            <Form.Label>{key.title}</Form.Label>
                            <Form.Control type={key.type} name={key.name} value={this.props[key.name]} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                    ))}
                    <Button type="submit">
                        Подтвердить
                    </Button>
                </Form>
            </>
        );
    }
}