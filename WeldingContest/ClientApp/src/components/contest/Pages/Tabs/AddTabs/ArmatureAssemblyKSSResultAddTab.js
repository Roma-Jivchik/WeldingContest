import React, { Component } from 'react';
import { ArmatureAssemblyKSSResultAddTabView } from './ArmatureAssemblyKSSResultAddTabView';

export class ArmatureAssemblyKSSResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            sampleRepositioningCount: 0,
            seamsUncleaningCount: 0,
            tackDefectsCount: 0,
            numberTacksChanges: 0,
            unfinishedEdgesCount: 0,
            heatAffectedSeamZonesUncleaningCount: 0,
            grinderCleaningCount: 0,
            deviationFromWeldingModesCount: 0,
            otherWarningsCount: 0,
            weldingTechnologyGeneralViolationsCount: 0,
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
        const response = await fetch(`armatureAssemblyKSSResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ArmatureAssemblyKSSResultAddTabView
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
            SampleRepositioningCount: this.state.sampleRepositioningCount,
            SeamsUncleaningCount: this.state.seamsUncleaningCount,
            TackDefectsCount: this.state.tackDefectsCount,
            NumberTacksChanges: this.state.wpsNumberTacksChanges,
            UnfinishedEdgesCount: this.state.unfinishedEdgesCount,
            HeatAffectedSeamZonesUncleaningCount: this.state.heatAffectedSeamZonesUncleaningCount,
            GrinderCleaningCount: this.state.grinderCleaningCount,
            DeviationFromWeldingModesCount: this.state.deviationFromWeldingModesCount,
            OtherWarningsCount: this.state.otherWarningsCount,
            WeldingTechnologyGeneralViolationsCount: this.state.weldingTechnologyGeneralViolationsCount,
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
            (
                this.state.sampleRepositioningCount * 10
                + this.state.seamsUncleaningCount * 5
                + this.state.unfinishedEdgesCount * 5
                + this.state.tackDefectsCount * 5
                + this.state.numberTacksChanges * 5
                + this.state.heatAffectedSeamZonesUncleaningCount * 5
                + this.state.grinderCleaningCount * 10
                + this.state.deviationFromWeldingModesCount * 3
                + this.state.otherWarningsCount * 3
                + this.state.weldingTechnologyGeneralViolationsCount * 20
            );
        let overallMark = 30 - penaltyMark;

        if (overallMark < 0) {
            overallMark = 0;
            penaltyMark = 30;
        }
        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }
}