import React, { Component } from 'react';
import { WeldingTimeResultTabView } from './WeldingTimeResultTabView';

export class WeldingTimeResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOfBegin: this.props.contestWork.weldingTimeResults[0].timeOfBegin,
            timeOfEnd: this.props.contestWork.weldingTimeResults[0].timeOfEnd,
            overallMark: this.props.contestWork.weldingTimeResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`weldingTimeResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <WeldingTimeResultTabView
                timeOfBegin={this.state.timeOfBegin}
                timeOfEnd={this.state.timeOfEnd}
                overallMark={this.state.overallMark}
                handleDelete={ this.handleDelete}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.weldingTimeResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }
}