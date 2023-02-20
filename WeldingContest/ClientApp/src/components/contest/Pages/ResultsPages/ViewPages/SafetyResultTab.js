import React, { Component } from 'react';
import { SafetyResultTabView } from './SafetyResultTabView';

export class SafetyResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lackOfProtectiveClothesCount: this.props.contestWork.safetyResults[0].lackOfProtectiveClothesCount,
            wrongEquipmentUsageCount: this.props.contestWork.safetyResults[0].wrongEquipmentUsageCount,
            machinesUntimelyDeenergizationCount: this.props.contestWork.safetyResults[0].machinesUntimelyDeenergizationCount,
            notes: this.props.contestWork.safetyResults[0].notes,
            overallMark: this.props.contestWork.safetyResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`safetyResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <SafetyResultTabView
                lackOfProtectiveClothesCount={this.state.lackOfProtectiveClothesCount}
                wrongEquipmentUsageCount={this.state.wrongEquipmentUsageCount}
                machinesUntimelyDeenergizationCount={this.state.machinesUntimelyDeenergizationCount}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.safetyResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}