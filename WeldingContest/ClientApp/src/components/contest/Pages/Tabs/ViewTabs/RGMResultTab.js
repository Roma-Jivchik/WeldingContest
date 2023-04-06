import React, { Component } from 'react';
import { RGMResultTabView } from './RGMResultTabView';

export class RGMResultTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallMark: this.props.contestWork.rgmResults[0].overallMark,
            penaltyMark: 30 - this.props.contestWork.rgmResults[0].overallMark,
            isHidden: false
        }

        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hideImage = this.hideImage.bind(this);
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`rgmResult/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <RGMResultTabView
                contestWork={this.props.contestWork}
                overallMark={this.state.overallMark}
                penaltyMark={this.state.penaltyMark}
                handleSubmit={this.handleSubmit}
                handleChangeInput={this.handleChangeInput}
                handleDelete={this.handleDelete}
                hideImage={ this.hideImage}
            />
            );
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данную оценку?")) {
            this.deleteObjectFromController(this.props.contestWork.rgmResults[0].id);

            setTimeout(() => { window.location.reload(true) }, 1000);
        }
    }

    hideImage() {
        this.setState({ isHidden: true });
    }
}