import React, { Component } from 'react';
import { ArmatureAssemblyKSSResultTabView } from './ArmatureAssemblyKSSResultTabView';

export class ArmatureAssemblyKSSResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleRepositioningCount: this.props.contestWork.armatureAssemblyKSSResults[0].sampleRepositioning,
            seamsUncleaningCount: this.props.contestWork.armatureAssemblyKSSResults[0].seamsUncleaningCount,
            tackDefectsCount: this.props.contestWork.armatureAssemblyKSSResults[0].tackDefectsCount,
            numberTacksChanges: this.props.contestWork.armatureAssemblyKSSResults[0].numberTacksChanges,
            unfinishedEdgesCount: this.props.contestWork.armatureAssemblyKSSResults[0].unfinishedEdgesCount,
            heatAffectedSeamZonesUncleaningCount: this.props.contestWork.armatureAssemblyKSSResults[0].heatAffectedSeamZonesUncleaningCount,
            grinderCleaningCount: this.props.contestWork.armatureAssemblyKSSResults[0].grinderCleaningCount,
            deviationFromWeldingModesCount: this.props.contestWork.armatureAssemblyKSSResults[0].deviationFromWeldingModesCount,
            otherWarningsCount: this.props.contestWork.armatureAssemblyKSSResults[0].otherWarningsCount,
            weldingTechnologyGeneralViolationsCount: this.props.contestWork.armatureAssemblyKSSResults[0].weldingTechnologyGeneralViolationsCount,
            notes: this.props.contestWork.armatureAssemblyKSSResults[0].notes,
            overallMark: this.props.contestWork.armatureAssemblyKSSResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.armatureAssemblyKSSResults[0].overallMark
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`armatureAssemblyKSSResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <ArmatureAssemblyKSSResultTabView
                sampleRepositioningCount={this.state.sampleRepositioningCount}
                seamsUncleaningCount={this.state.seamsUncleaningCount}
                tackDefectsCount={this.state.tackDefectsCount}
                numberTacksChanges={this.state.numberTacksChanges}
                unfinishedEdgesCount={this.state.unfinishedEdgesCount}
                heatAffectedSeamZonesUncleaningCount={this.state.heatAffectedSeamZonesUncleaningCount}
                grinderCleaningCount={this.state.grinderCleaningCount}
                deviationFromWeldingModesCount={this.state.deviationFromWeldingModesCount}
                otherWarningsCount={this.state.otherWarningsCount}
                weldingTechnologyGeneralViolationsCount={this.state.weldingTechnologyGeneralViolationsCount}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.armatureAssemblyKSSResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}