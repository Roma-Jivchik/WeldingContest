import React, { Component } from 'react';
import { AssemblyKSSResultTabView } from './AssemblyKSSResultTabView';

export class AssemblyKSSResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gapSize: this.props.contestWork.assemblyKSSResults[0].gapSize,
            unfinishedEdgesCount: this.props.contestWork.assemblyKSSResults[0].unfinishedEdgesCount,
            wpsNumberTacksChanges: this.props.contestWork.assemblyKSSResults[0].wpsNumberTacksChanges,
            seamsUncleaningCount: this.props.contestWork.assemblyKSSResults[0].seamsUncleaningCount,
            heatAffectedSeamZonesUncleaningCount: this.props.contestWork.assemblyKSSResults[0].heatAffectedSeamZonesUncleaningCount,
            grinderCleaningCount: this.props.contestWork.assemblyKSSResults[0].grinderCleaningCount,
            deviationFromWeldingModesCount: this.props.contestWork.assemblyKSSResults[0].deviationFromWeldingModesCount,
            sampleRepositioningCount: this.props.contestWork.assemblyKSSResults[0].sampleRepositioningCount,
            personalWeldingToolsUsed: this.props.contestWork.assemblyKSSResults[0].personalWeldingToolsUsed,
            notes: this.props.contestWork.assemblyKSSResults[0].notes,
            overallMark: this.props.contestWork.assemblyKSSResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.assemblyKSSResults[0].overallMark
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`assemblyKSSResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <AssemblyKSSResultTabView
                gapSize={this.state.gapSize}
                unfinishedEdgesCount={this.state.unfinishedEdgesCount}
                wpsNumberTacksChanges={this.state.wpsNumberTacksChanges}
                seamsUncleaningCount={this.state.seamsUncleaningCount}
                heatAffectedSeamZonesUncleaningCount={this.state.heatAffectedSeamZonesUncleaningCount}
                grinderCleaningCount={this.state.grinderCleaningCount}
                deviationFromWeldingModesCount={this.state.deviationFromWeldingModesCount}
                sampleRepositioningCount={this.state.sampleRepositioningCount}
                personalWeldingToolsUsed={this.state.personalWeldingToolsUsed}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.assemblyKSSResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}