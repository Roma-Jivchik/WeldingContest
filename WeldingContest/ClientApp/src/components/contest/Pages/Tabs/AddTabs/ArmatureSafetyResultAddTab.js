import React, { Component } from 'react';
import { ArmatureSafetyResultAddTabView } from './ArmatureSafetyResultAddTabView';

export class ArmatureSafetyResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            wrongProtectiveClothesCount: 0,
            wrongGrinderCleaningCount: 0,
            wrongEquipmentUsageCount: 0,
            notes: "",
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
        const response = await fetch(`armatureSafetyResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ArmatureSafetyResultAddTabView
                wrongProtectiveClothesCount={this.state.wrongProtectiveClothesCount}
                wrongGrinderCleaningCount={this.state.wrongGrinderCleaningCount}
                wrongEquipmentUsageCount={this.state.wrongEquipmentUsageCount}
                notes={this.state.notes}
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
            WrongProtectiveClothesCount: this.state.wrongProtectiveClothesCount,
            WrongGrinderCleaningCount: this.state.wrongGrinderCleaningCount,
            WrongEquipmentUsageCount: this.state.wrongEquipmentUsageCount,
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

    handleChangeInput(event) {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let penaltyMark =
            (this.state.wrongProtectiveClothesCount * 3
                + this.state.wrongGrinderCleaningCount * 3
                + this.state.wrongEquipmentUsageCount * 5);
        let overallMark = 10 - penaltyMark;

        if (overallMark < 0) {
            overallMark = 0;
            penaltyMark = 10;
        }
        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }
}