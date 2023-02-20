import React, { Component } from 'react';
import { AssemblyKSSResultAddTabView } from './AssemblyKSSResultAddTabView';

export class AssemblyKSSResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            gapSize: 0,
            unfinishedEdgesCount: 0,
            wpsNumberTacksChanges: 0,
            seamsUncleaningCount: 0,
            heatAffectedSeamZonesUncleaningCount: 0,
            grinderCleaningCount: 0,
            deviationFromWeldingModesCount: 0,
            sampleRepositioningCount: 0,
            personalWeldingToolsUsed: 0,
            notes: "",
            overallMark: 30,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`assemblyKSSResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <AssemblyKSSResultAddTabView
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
            GapSize: this.state.gapSize,
            UnfinishedEdgesCount: this.state.unfinishedEdgesCount,
            WPSNumberTacksChanges: this.state.wpsNumberTacksChanges,
            SeamsUncleaningCount: this.state.seamsUncleaningCount,
            HeatAffectedSeamZonesUncleaningCount: this.state.heatAffectedSeamZonesUncleaningCount,
            GrinderCleaningCount: this.state.grinderCleaningCount,
            DeviationFromWeldingModesCount: this.state.deviationFromWeldingModesCount,
            SampleRepositioningCount: this.state.sampleRepositioningCount,
            PersonalWeldingToolsUsed: this.state.personalWeldingToolsUsed,
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
    }

    handleChangeInput() {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let overallMark =
            30 -
            (this.state.unfinishedEdgesCount * 5
                + this.state.wpsNumberTacksChanges * 5
                + this.state.seamsUncleaningCount * 5
                + this.state.heatAffectedSeamZonesUncleaningCount * 5
                + this.state.grinderCleaningCount * 10
                + this.state.deviationFromWeldingModesCount * 5
                + this.state.sampleRepositioningCount * 20
                + this.state.personalWeldingToolsUsed * 20);
        if (overallMark < 0) {
            overallMark = 0;
        }
        this.setState({ overallMark: overallMark });
        console.log(overallMark);
    }
}