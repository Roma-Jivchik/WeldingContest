import React, { Component } from 'react';
import { SafetyResultAddTabView } from './SafetyResultAddTabView';

export class SafetyResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            lackOfProtectiveClothesCount: 0,
            wrongEquipmentUsageCount: 0,
            machinesUntimelyDeenergizationCount: 0,
            notes: "",
            overallMark: 10,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`safetyResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <SafetyResultAddTabView
                lackOfProtectiveClothesCount={this.state.lackOfProtectiveClothesCount}
                wrongEquipmentUsageCount={this.state.wrongEquipmentUsageCount}
                machinesUntimelyDeenergizationCount={this.state.machinesUntimelyDeenergizationCount}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
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
            LackOfProtectiveClothesCount: this.state.lackOfProtectiveClothesCount,
            WrongEquipmentUsageCount: this.state.wrongEquipmentUsageCount,
            MachinesUntimelyDeenergizationCount: this.state.machinesUntimelyDeenergizationCount,
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
        let overallMark =
            10 -
            (this.state.lackOfProtectiveClothesCount * 3
                + this.state.wrongEquipmentUsageCount * 5
                + this.state.machinesUntimelyDeenergizationCount * 5);
        if (overallMark < 0) {
            overallMark = 0;
        }
        this.setState({ overallMark: overallMark });
        console.log(overallMark);
    }
}