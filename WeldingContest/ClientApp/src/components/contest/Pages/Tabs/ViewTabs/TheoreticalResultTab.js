import React, { Component } from 'react';
import { TheoreticalResultTabView } from './TheoreticalResultTabView';

export class TheoreticalResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallMark: this.props.contestWork.theoreticalResults[0].overallMark,
            penaltyMark: 20 - this.props.contestWork.theoreticalResults[0].overallMark
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`theoreticalResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <TheoreticalResultTabView
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleDelete={ this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (window.confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.theoreticalResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}