import React, { Component } from 'react';

export class Controller extends Component {
    static displayName = Controller.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            </>
        );
    }

    async getCollectionFromController() {
        const response = await fetch(`${this.props.controllerName}/getAll`);
        const data = await response.json();
        this.props.getCollection(data);
        console.log(data);
    }

    async getObjectFromController(id) {
        const response = await fetch(`${this.props.controllerName}/getByID?id=${id}`);
        const data = await response.json();
        this.props.getObject(data);
        console.log(data);
    }

    async postObjectToController(object) {
        const response = await fetch(`${this.props.controllerName}/post`, {
            method: 'POST',
            body: JSON.stringify(object)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    async putObjectToController(object) {
        const response = await fetch(`${this.props.controllerName}/put`, {
            method: 'PUT',
            body: JSON.stringify(object)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`${this.props.controllerName}/delete`, {
            method: 'POST',
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }
}