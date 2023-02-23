import React, { Component } from 'react';
import { WeldingTimeResultAddTabView } from './WeldingTimeResultAddTabView';

export class WeldingTimeResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            timeOfBegin: "10:00",
            timeOfEnd: "10:25",
            overallMark: 10,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`weldingTimeResult/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <WeldingTimeResultAddTabView
                timeOfBegin={this.state.timeOfBegin}
                timeOfEnd={this.state.timeOfEnd}
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
            TimeOfBegin: this.state.timeOfBegin,
            TimeOfEnd: this.state.timeOfEnd,
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
        this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
    }

    countOverallMark() {
        let timeOfBegin = parseInt(this.state.timeOfBegin.split(":")[0]) * 60 + parseInt(this.state.timeOfBegin.split(":")[1]);
        let timeOfEnd = parseInt(this.state.timeOfEnd.split(":")[0]) * 60 + parseInt(this.state.timeOfEnd.split(":")[1]);

        let overallMark = 10 - (Math.max((timeOfEnd - timeOfBegin) - 25, 0));
        if (overallMark < 0) {
            overallMark = 0;
        }

        this.setState({ overallMark: overallMark });
        console.log(overallMark);
    }
}