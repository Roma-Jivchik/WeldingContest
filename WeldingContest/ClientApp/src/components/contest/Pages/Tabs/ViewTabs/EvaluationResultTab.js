import React, { Component } from 'react';
import { EvaluationResultTabView } from './EvaluationResultTabView';

export class EvaluationResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assemblyKSSMark: this.props.contestWork.evaluationResults[0].assemblyKSSMark,
            safetyMark: this.props.contestWork.evaluationResults[0].safetyMark,
            weldingTimeMark: this.props.contestWork.evaluationResults[0].weldingTimeMark,
            consumptionWeldingMaterialsMark: this.props.contestWork.evaluationResults[0].consumptionWeldingMaterialsMark,
            vmcMark: this.props.contestWork.evaluationResults[0].vmcMark,
            rgmMark: this.props.contestWork.evaluationResults[0].rgmMark,
            theoreticalMark: this.props.contestWork.evaluationResults[0].theoreticalMark,
            overallMark: this.props.contestWork.evaluationResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`evaluationResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <EvaluationResultTabView
                assemblyKSSMark={this.state.assemblyKSSMark}
                safetyMark={this.state.safetyMark}
                weldingTimeMark={this.state.weldingTimeMark}
                consumptionWeldingMaterialsMark={this.state.consumptionWeldingMaterialsMark}
                vmcMark={this.state.vmcMark}
                rgmMark={this.state.rgmMark}
                theoreticalMark={this.state.theoreticalMark}
                overallMark={this.state.overallMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.evaluationResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}