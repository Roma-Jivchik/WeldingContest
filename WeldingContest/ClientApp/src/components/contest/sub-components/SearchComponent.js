import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export class SearchComponent extends Component {
    static displayName = SearchComponent.name;

    constructor(props) {
        super(props);

        this.state = {
            result: [],
            searchParameter: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                    <Form.Group className = "mb-3">
                        <Form.Label size="sm">{this.props.searchParameterName}</Form.Label>
                        <Form.Control size="sm" type="text" placeholder={this.props.searchParameterName} onChange={this.handleInputChange} />
                    </Form.Group>
                <Button size="sm" variant="primary" type="submit">
                    Подтвердить
                </Button>
            </Form>
        );
    }

    async handleSubmit(event) {
        event.preventDefault();
        const url = this.props.controllerName;
        const data = this.state.searchParameter;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json();
        this.props.handleResult(responseData);
    }

    handleInputChange(event) {
        this.setState({ searchParameter: event.target.value });
    }
}