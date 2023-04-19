import React, { Component } from 'react';
import { VMCResultTabView } from './VMCResultTabView';

export class VMCResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lackOfPenetrationUpTo10mmCount: this.props.contestWork.vmcResults[0].lackOfPenetrationUpTo10mmCount,
            lackOfPenetrationFrom10mmTo20mmCount: this.props.contestWork.vmcResults[0].lackOfPenetrationFrom10mmTo20mmCount,
            lackOfPenetrationFrom20mmCount: this.props.contestWork.vmcResults[0].lackOfPenetrationFrom20mmCount,
            edgeOffsetCount: this.props.contestWork.vmcResults[0].edgeOffsetCount,
            undercutUpTo10mmCount: this.props.contestWork.vmcResults[0].undercutUpTo10mmCount,
            undercutFrom20mmCount: this.props.contestWork.vmcResults[0].undercutFrom20mmCount,
            undercutRemovalCount: this.props.contestWork.vmcResults[0].undercutRemovalCount,
            sinkingCount: this.props.contestWork.vmcResults[0].sinkingCount,
            excessPenetrationCount: this.props.contestWork.vmcResults[0].excessPenetrationCount,
            excessSeamWidthCount: this.props.contestWork.vmcResults[0].excessSeamWidthCount,
            excessSeamConvexityCount: this.props.contestWork.vmcResults[0].excessSeamConvexityCount,
            excessSeamScalingCount: this.props.contestWork.vmcResults[0].excessSeamScalingCount,
            roughTransitionCount: this.props.contestWork.vmcResults[0].roughTransitionCount,
            poresAndSludgeCount: this.props.contestWork.vmcResults[0].poresAndSludgeCount,
            otherWarningsCount: this.props.contestWork.vmcResults[0].otherWarningsCount,
            seamGeometryCount: this.props.contestWork.vmcResults[0].seamGeometryCount,
            pipeSeamsDisplacement: this.props.contestWork.vmcResults[0].pipeSeamsDisplacement,
            notes: this.props.contestWork.vmcResults[0].notes,
            overallMark: this.props.contestWork.vmcResults[0].overallMark,
            penaltyMark: 50 - this.props.contestWork.vmcResults[0].overallMark
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`vmcResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <VMCResultTabView
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
                poresAndSludgeCount={this.state.poresAndSludgeCount}
                otherWarningsCount={this.state.otherWarningsCount}
                seamGeometryCount={this.state.seamGeometryCount}
                pipeSeamsDisplacement={this.state.pipeSeamsDisplacement}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={ this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.vmcResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}