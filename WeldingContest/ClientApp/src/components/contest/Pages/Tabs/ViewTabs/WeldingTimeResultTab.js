import React, { Component } from 'react';
import { WeldingTimeResultTabView } from './WeldingTimeResultTabView';

export class WeldingTimeResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeOfBegin: this.props.contestWork.weldingTimeResults[0].timeOfBegin.substring(11, 16),
            timeOfEnd: this.props.contestWork.weldingTimeResults[0].timeOfEnd.substring(11, 16),
            overallMark: this.props.contestWork.weldingTimeResults[0].overallMark,
            penaltyMark: 10 - this.props.contestWork.weldingTimeResults[0].overallMark,
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        console.log(this.state.timeOfBegin);
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
                penaltyMark={this.state.penaltyMark}
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