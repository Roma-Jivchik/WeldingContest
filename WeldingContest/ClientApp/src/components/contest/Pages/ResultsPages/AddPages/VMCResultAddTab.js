import React, { Component } from 'react';
import { VMCResultAddTabView } from './VMCResultAddTabView';

export class VMCResultAddTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contestWorkID: this.props.contestWork.id,
            lackOfPenetrationUpTo10mmCount: 0,
            lackOfPenetrationFrom10mmTo20mmCount: 0,
            lackOfPenetrationFrom20mmCount: 0,
            edgeOffsetCount: 0,
            undercutUpTo10mmCount: 0,
            undercutFrom20mmCount: 0,
            undercutRemovalCount: 0,
            sinkingCount: 0,
            excessPenetrationCount: 0,
            excessSeamWidthCount: 0,
            excessSeamConvexityCount: 0,
            excessSeamScalingCount: 0,
            roughTransitionCount: 0,
            otherWarningsCount: 0,
            seamGeometryCount: 0,
            pipeSeamsDisplacement: 0,
            notes: "",
            overallMark: 50,
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countOverallMark = this.countOverallMark.bind(this);
    }

    async postObjectToController(object) {
        const response = await fetch(`vmcResult/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <VMCResultAddTabView
                lackOfPenetrationUpTo10mmCount={this.state.lackOfPenetrationUpTo10mmCount}
                lackOfPenetrationFrom10mmTo20mmCount={this.state.lackOfPenetrationFrom10mmTo20mmCount}
                lackOfPenetrationFrom20mmCount={this.state.lackOfPenetrationFrom20mmCount}
                edgeOffsetCount={this.state.edgeOffsetCount}
                sinkingCount={this.state.sinkingCount}
                undercutUpTo10mmCount={this.state.undercutUpTo10mmCount}
                undercutFrom20mmCount={this.state.undercutFrom20mmCount}
                undercutRemovalCount={this.state.undercutRemovalCount}
                excessPenetrationCount={this.state.excessPenetrationCount}
                excessSeamWidthCount={this.state.excessSeamWidthCount}
                excessSeamConvexityCount={this.state.excessSeamConvexityCount}
                excessSeamScalingCount={this.state.excessSeamScalingCount}
                roughTransitionCount={this.state.roughTransitionCount}
                otherWarningsCount={this.state.otherWarningsCount}
                seamGeometryCount={this.state.seamGeometryCount}
                pipeSeamsDisplacement={this.state.pipeSeamsDisplacement}
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
            LackOfPenetrationUpTo10mmCount: this.state.lackOfPenetrationUpTo10mmCount,
            LackOfPenetrationFrom10mmTo20mmCount: this.state.lackOfPenetrationFrom10mmTo20mmCount,
            LackOfPenetrationFrom20mmCount: this.state.lackOfPenetrationFrom20mmCount,
            EdgeOffsetCount: this.state.edgeOffsetCount,
            UndercutUpTo10mmCount: this.state.undercutUpTo10mmCount,
            UndercutFrom20mmCount: this.state.undercutFrom20mmCount,
            UndercutRemovalCount: this.state.undercutRemovalCount,
            SinkingCount: this.state.sinkingCount,
            ExcessPenetrationCount: this.state.excessPenetrationCount,
            ExcessSeamWidthCount: this.state.excessSeamWidthCount,
            ExcessSeamConvexityCount: this.state.excessSeamConvexityCount,
            ExcessSeamScalingCount: this.state.excessSeamScalingCount,
            RoughTransitionCount: this.state.roughTransitionCount,
            OtherWarningsCount: this.state.otherWarningsCount,
            SeamGeometryCount: this.state.seamGeometryCount,
            PipeSeamsDisplacement: this.state.pipeSeamsDisplacement,
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
            50 -
            (this.state.LackOfPenetrationUpTo10mmCount * 5
                + this.state.LackOfPenetrationFrom10mmTo20mmCount * 10
                + this.state.LackOfPenetrationFrom20mmCount * 20
                + this.state.EdgeOffsetCount * 3
                + this.state.UndercutUpTo10mmCount * 3
                + this.state.UndercutFrom20mmCount * 5
                + this.state.UndercutRemovalCount * 5
                + this.state.SinkingCount * 3
                + this.state.ExcessPenetrationCount * 3
                + this.state.ExcessSeamWidthCount * 3
                + this.state.ExcessSeamConvexityCount * 5
                + this.state.ExcessSeamScalingCount * 3
                + this.state.RoughTransitionCount * 10
                + this.state.OtherWarningsCount * 3
                + this.state.SeamGeometryCount * 5
                + this.state.PipeSeamsDisplacement * 5);
        if (overallMark < 0) {
            overallMark = 0;
        }
        this.setState({ overallMark: overallMark });
        console.log(overallMark);
    }
}