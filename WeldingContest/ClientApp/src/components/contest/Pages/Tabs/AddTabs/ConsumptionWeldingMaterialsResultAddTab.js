import React, { Component } from 'react';
import { ConsumptionWeldingMaterialsResultAddTabView } from './ConsumptionWeldingMaterialsResultAddTabView';

export class ConsumptionWeldingMaterialsResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            consumbleMaterialAmount: 0,
            overallMark: 10,
            penaltyMark: 0,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`consumptionWeldingMaterialsResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ConsumptionWeldingMaterialsResultAddTabView
                consumbleMaterialAmount={this.state.consumbleMaterialAmount}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
            />
            );
    }

    handleSubmit(event) {
        event.preventDefault();

        let object = {
            ID: "_",
            ContestWorkID: this.state.contestWorkID,
            ConsumbleMaterialAmount: this.state.consumbleMaterialAmount,
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

    handleChangeInput(event) {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let penaltyMark = this.state.consumbleMaterialAmount;
        let overallMark = 10 - penaltyMark;

        if (overallMark < 0) {
            overallMark = 0;
            penaltyMark = 10;
        }
        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }
}