import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { FormView } from './FormView';

export class FormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keys: [
                {
                    title: "Тест1",
                    type: "text",
                    name:"test1"
                },
                {
                    title: "Тест2",
                    type: "number",
                    name: "test2"
                },
                {
                    title: "Тест3",
                    type: "date",
                    name: "test3",
                },
            ],
            test1: "",
            test2: "",
            test3: "",
            object: {
                test1: "",
                test2: "",
                test3: "",
            },
            validated:false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    render() {
        return (
            <FormView
                keys={this.props.keys}
                object={this.props.object}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={this.handleSubmit}
                validated={this.state.validated}
            />
        );
    }

    handleSubmit() {
        event.preventDefault();
        let object = {
            "firstField": this.state.test1,
            "secondField": this.state.test2,
            "thirdField": this.state.test3
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        this.setState({ validated: true });
        console.log(object);
    }

    handleChangeInput() {
        console.log(event.target.name);
        this.setState({[event.target.name]: event.target.value});
    }
}