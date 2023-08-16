import React, { Component } from 'react';
import { MechanicalTestResultTabView } from './MechanicalTestResultTabView';

export class MechanicalTestResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destructionWeldLessStrength: this.props.contestWork.mechanicalTestResults[0].destructionWeldLessStrength,
            destructionWeldEqualsStrength: this.props.contestWork.mechanicalTestResults[0].destructionWeldEqualsStrength,
            destructionHeatAffectedLessStrength: this.props.contestWork.mechanicalTestResults[0].destructionHeatAffectedLessStrength,
            destructionHeatAffectedEqualsStrength: this.props.contestWork.mechanicalTestResults[0].destructionHeatAffectedEqualsStrength,
            destructionBaseMetalCount: this.props.contestWork.mechanicalTestResults[0].destructionBaseMetalCount,
            notes: this.props.contestWork.mechanicalTestResults[0].notes,
            overallMark: this.props.contestWork.mechanicalTestResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.mechanicalTestResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`mechanicalTestResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <MechanicalTestResultTabView
                destructionWeldLessStrength={this.state.destructionWeldLessStrength}
                destructionWeldEqualsStrength={this.state.destructionWeldEqualsStrength}
                destructionHeatAffectedLessStrength={this.state.destructionHeatAffectedLessStrength}
                destructionHeatAffectedEqualsStrength={this.state.destructionHeatAffectedEqualsStrength}
                destructionBaseMetalCount={this.state.destructionBaseMetalCount}
                notes={ this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.mechanicalTestResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}