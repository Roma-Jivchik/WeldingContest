import React, { Component } from 'react';
import { TheoreticalResultAddTabView } from './TheoreticalResultAddTabView';

export class TheoreticalResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            overallMark: 20,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`theoreticalResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <TheoreticalResultAddTabView
                overallMark={this.state.overallMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
            />
            );
    }

    handleSubmit() {
        //event.preventDefault();
        let object = {
            ID: "_",
            ContestWorkID: this.state.contestWorkID,
            OverallMark: this.state.overallMark,
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
        }
    }

    handleChangeInput() {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value });
        }
    }
}