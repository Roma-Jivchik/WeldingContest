import React, { Component } from 'react';
import { ArmatureVMCResultTabView } from './ArmatureVMCResultTabView';

export class ArmatureVMCResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            craterPresenceCount: this.props.contestWork.armatureVMCResults[0].craterPresenceCount,
            insufficientSeamLengthCount: this.props.contestWork.armatureVMCResults[0].insufficientSeamLengthCount,
            undercutUpTo5mmCount: this.props.contestWork.armatureVMCResults[0].undercutUpTo5mmCount,
            undercutFrom5mmCount: this.props.contestWork.armatureVMCResults[0].undercutFrom5mmCount,
            contiuousUndercutCount: this.props.contestWork.armatureVMCResults[0].contiuousUndercutCount,
            excessSeamWidthCount: this.props.contestWork.armatureVMCResults[0].excessSeamWidthCount,
            leakCount: this.props.contestWork.armatureVMCResults[0].leakCount,
            roughTransitionCount: this.props.contestWork.armatureVMCResults[0].roughTransitionCount,
            otherWarningsCount: this.props.contestWork.armatureVMCResults[0].otherWarningsCount,
            seamGeometryCount: this.props.contestWork.armatureVMCResults[0].seamGeometryCount,
            notes: this.props.contestWork.armatureVMCResults[0].notes,
            overallMark: this.props.contestWork.armatureVMCResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.armatureVMCResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`armatureVMCResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <ArmatureVMCResultTabView
                craterPresenceCount={this.state.craterPresenceCount}
                insufficientSeamLengthCount={this.state.insufficientSeamLengthCount}
                undercutUpTo5mmCount={this.state.undercutUpTo5mmCount}
                undercutFrom5mmCount={this.state.undercutFrom5mmCount}
                contiuousUndercutCount={this.state.contiuousUndercutCount}
                excessSeamWidthCount={this.state.excessSeamWidthCount}
                leakCount={this.state.leakCount}
                roughTransitionCount={this.state.roughTransitionCount}
                otherWarningsCount={this.state.otherWarningsCount}
                seamGeometryCount={this.state.seamGeometryCount}
                notes={this.state.notes}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.armatureVMCResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}