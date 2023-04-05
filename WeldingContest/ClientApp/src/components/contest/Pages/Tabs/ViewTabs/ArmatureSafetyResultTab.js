import React, { Component } from 'react';
import { ArmatureSafetyResultTabView } from './ArmatureSafetyResultTabView';

export class ArmatureSafetyResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wrongProtectiveClothesCount: this.props.contestWork.armatureSafetyResults[0].wrongProtectiveClothesCount,
            wrongGrinderCleaningCount: this.props.contestWork.armatureSafetyResults[0].wrongGrinderCleaningCount,
            wrongEquipmentUsageCount: this.props.contestWork.armatureSafetyResults[0].wrongEquipmentUsageCount,
            notes: this.props.contestWork.armatureSafetyResults[0].notes,
            overallMark: this.props.contestWork.armatureSafetyResults[0].overallMark,
            penaltyMark: 10 - this.props.contestWork.armatureSafetyResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`armatureSafetyResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <ArmatureSafetyResultTabView
                wrongProtectiveClothesCount={this.state.wrongProtectiveClothesCount}
                wrongGrinderCleaningCount={this.state.wrongGrinderCleaningCount}
                wrongEquipmentUsageCount={this.state.wrongEquipmentUsageCount}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.armatureSafetyResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}