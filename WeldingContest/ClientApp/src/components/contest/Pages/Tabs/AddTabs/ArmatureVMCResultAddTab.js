import React, { Component } from 'react';
import { ArmatureVMCResultAddTabView } from './ArmatureVMCResultAddTabView';

export class ArmatureVMCResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            craterPresenceCount: 0,
            insufficientSeamLengthCount: 0,
            undercutUpTo5mmCount: 0,
            undercutFrom5mmCount: 0,
            contiuousUndercutCount: 0,
            excessSeamWidthCount: 0,
            leakCount: 0,
            roughTransitionCount: 0,
            poresAndSludgeCount: 0,
            otherWarningsCount: 0,
            seamGeometryCount: 0,
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
        const response = await fetch(`armatureVMCResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <ArmatureVMCResultAddTabView
                craterPresenceCount={this.state.craterPresenceCount}
                insufficientSeamLengthCount={this.state.insufficientSeamLengthCount}
                undercutUpTo5mmCount={this.state.undercutUpTo5mmCount}
                undercutFrom5mmCount={this.state.undercutFrom5mmCount}
                contiuousUndercutCount={this.state.contiuousUndercutCount}
                excessSeamWidthCount={this.state.excessSeamWidthCount}
                leakCount={this.state.leakCount}
                roughTransitionCount={this.state.roughTransitionCount}
                poresAndSludgeCount={this.state.poresAndSludgeCount}
                otherWarningsCount={this.state.otherWarningsCount}
                seamGeometryCount={this.state.seamGeometryCount}
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
            CraterPresenceCount: this.state.craterPresenceCount,
            InsufficientSeamLengthCount: this.state.insufficientSeamLengthCount,
            UndercutUpTo5mmCount: this.state.undercutUpTo5mmCount,
            UndercutFrom5mmCount: this.state.undercutFrom5mmCount,
            ContiuousUndercutCount: this.state.contiuousUndercutCount,
            ExcessSeamWidthCount: this.state.excessSeamWidthCount,
            LeakCount: this.state.leakCount,
            SinkingCount: this.state.sinkingCount,
            RoughTransitionCount: this.state.roughTransitionCount,
            PoresAndSludgeCount: this.state.poresAndSludgeCount,
            OtherWarningsCount: this.state.otherWarningsCount,
            SeamGeometryCount: this.state.seamGeometryCount,
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

        setTimeout(() => { window.location.reload()}, 500);
    }

    handleChangeInput(event) {
        if (event.target.value >= 0) {
            this.setState({ [event.target.name]: event.target.value }, () => { this.countOverallMark() });
        }
    }

    countOverallMark() {
        let penaltyMark =
            (
                this.state.craterPresenceCount * 5
                + this.state.insufficientSeamLengthCount * 5
                + this.state.undercutUpTo5mmCount * 3
                + this.state.undercutFrom5mmCount * 5
                + this.state.contiuousUndercutCount * 10
                + this.state.excessSeamWidthCount * 3
                + this.state.leakCount * 5
                + this.state.roughTransitionCount * 10
                + this.state.poresAndSludgeCount * 3
                + this.state.otherWarningsCount * 3
                + this.state.seamGeometryCount * 5);
        let overallMark = 30 - penaltyMark;

        if (overallMark < 0) {
            overallMark = 0;
            penaltyMark = 30;
        }
        this.setState({ overallMark: overallMark, penaltyMark: penaltyMark });
        console.log(overallMark);
    }
}