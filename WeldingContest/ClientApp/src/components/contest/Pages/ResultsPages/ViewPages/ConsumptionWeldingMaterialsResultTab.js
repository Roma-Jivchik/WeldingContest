import React, { Component } from 'react';
import { ConsumptionWeldingMaterialsResultTabView } from './ConsumptionWeldingMaterialsResultTabView';

export class ConsumptionWeldingMaterialsResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consumbleMaterialAmount: this.props.contestWork.consumptionWeldingMaterialsResults[0].consumbleMaterialAmount,
            overallMark: this.props.contestWork.consumptionWeldingMaterialsResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`consumptionWeldingMaterialsResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <ConsumptionWeldingMaterialsResultTabView
                consumbleMaterialAmount={this.state.consumbleMaterialAmount}
                overallMark={this.state.overallMark}
                handleDelete={this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.consumptionWeldingMaterialsResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}