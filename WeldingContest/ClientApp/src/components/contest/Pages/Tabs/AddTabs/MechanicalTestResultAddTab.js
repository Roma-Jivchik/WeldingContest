import React, { Component } from 'react';
import { MechanicalTestResultAddTabView } from './MechanicalTestResultAddTabView';

export class MechanicalTestResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            destructionWeldLessStrength: 0,
            destructionWeldEqualsStrength: 0,
            destructionHeatAffectedLessStrength: 0,
            destructionHeatAffectedEqualsStrength: 0,
            destructionBaseMetalCount: 0,
            notes: "",
            overallMark: 30,
            penaltyMark: 0,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`mechanicalTestResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <MechanicalTestResultAddTabView
                destructionWeldLessStrength={this.state.destructionWeldLessStrength}
                destructionWeldEqualsStrength={this.state.destructionWeldEqualsStrength}
                destructionHeatAffectedLessStrength={this.state.destructionHeatAffectedLessStrength}
                destructionHeatAffectedEqualsStrength={this.state.destructionHeatAffectedEqualsStrength}
                destructionBaseMetalCount={this.state.destructionBaseMetalCount}
                notes={ this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();

        let object = {
            ID: "_",
            ContestWorkID: this.state.contestWorkID,
            DestructionWeldLessStrength: this.state.destructionWeldLessStrength,
            DestructionWeldEqualsStrength: this.state.destructionWeldEqualsStrength,
            DestructionHeatAffectedLessStrength: this.state.destructionHeatAffectedLessStrength,
            DestructionHeatAffectedEqualsStrength: this.state.destructionHeatAffectedEqualsStrength,
            destructionBaseMetalCount: this.state.destructionBaseMetalCount,
            Notes: this.state.notes,
            OverallMark: this.state.overallMark,
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
        }

        setTimeout(() => { window.location.reload() }, 500);
    }

    handleChangeInput() {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let penaltyMark =
            (this.state.destructionWeldLessStrength * 30
                + this.state.destructionWeldEqualsStrength * 20
                + this.state.destructionHeatAffectedLessStrength * 30
                + this.state.destructionHeatAffectedEqualsStrength * 10);
        let overallMark = 30 - penaltyMark;

        if (overallMark < 0) {
            overallMark = 0;
            penaltyMark = 30;
        }
        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }
}