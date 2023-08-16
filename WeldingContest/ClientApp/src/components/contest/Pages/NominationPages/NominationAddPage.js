﻿import React, { Component } from 'react';
import { NominationAddPageView } from './NominationAddPageView';

export class NominationAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            size: "",
            thickness: "",
            material: "",
            weldingType: "",
            sampleType: "",
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Добавление номинации");
    }

    async postObjectToController(object) {
        const response = await fetch(`nomination/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        window.location = ('/Nominations');
    }

    render() {
        return (
            <NominationAddPageView
                title={this.state.title}
                size={this.state.size}
                thickness={this.state.thickness}
                material={this.state.material}
                weldingType={this.state.weldingType}
                sampleType={this.state.sampleType}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={this.handleSubmit}

            />
            );
    }

    handleSubmit(event) {
        event.preventDefault();
        let object = {
            ID: "_",
            Title: this.state.title,
            Size: this.state.size,
            Thickness: this.state.thickness,
            Material: this.state.material,
            WeldingType: this.state.weldingType,
            SampleType: this.state.sampleType
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
        }
    }

    handleChangeInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
}